const axios = require("axios");

/**
 * 
 * @param {*} url 
 * @param {*} inputParams 
 * @returns 
 */
async function apiCall(url, inputParams = {}) {
  try {
    const params = Object.assign(inputParams, { apiKey: process.env.APIKEY });
    const res = await axios(url, { params });
    //maybe later try changing all ids from res to spoon_id
    //let modifiedRes = {...res}
    //modifiedRes.spoon_id = res.id
    //console.log(res.data.image)
    return {success: true, data: res.data, error: null}
  } catch (error) {
      console.log(error)
      return {success: false, data: null, error: error}
  }
}

module.exports = apiCall;
