const query = require('../config/mysql.config')
const apiCall = require('../api/api')

async function getRecipeBySpoonId(res, spoonId){
    const [recipe] = await query("SELECT * FROM recipes WHERE recipes.spoon_id = ?")
    if(recipe){
        return res.send({success: true, data: recipe, error: null})
    }
    const apiRes = await apiCall(`https://api.spoonacular.com/recipes/${spoonId}/information`, {})//this will get the recipe then if not null add it to the database and return it

}

module.exports = { getRecipeBySpoonId }