const query = require("../config/mysql.config");
const bcrypt = require("bcrypt");


/**
 * 
 * @param {*} res 
 * @param {*} username 
 * @param {*} password 
 * @returns 
 */
async function login(res, username, password) {
  try {
    const [user] = await query("SELECT * FROM users WHERE users.username = ?", [
      username,
    ]);
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        return res.send({
          success: true,
          data: { id: user.id, username: user.username },
          error: null,
        });
      } else {
        return res.send({
          success: false,
          data: null,
          error: "Invalid username or password",
        });
      }
    }
    return res.send({
      success: false,
      data: null,
      error: "Invalid username or password",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      data: null,
      error: "Something went wrong please try again later.",
    });
  }
}

/**
 *
 * @param {*} res
 * @param {*} username
 * @param {*} password
 * @returns
 */
async function signup(res, username, password) {
  try {
    const [user] = await query("SELECT * FROM users WHERE users.username = ?", [
      username,
    ]);
    if (user) {
      return res.send({
        success: false,
        data: null,
        error: "Username already in use",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    await query("INSERT INTO users (username, password) VALUE (?, ?)", [
      username,
      hash,
    ]);
    return res.send({ success: true, data: null, error: null });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      data: null,
      error: "Something went wrong please try again later.",
    });
  }
}

module.exports = { login, signup }