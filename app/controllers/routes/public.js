const config = require("../../config/config");
const objects = require("../../config/objects");

const auth = require("../../helpers/auth");

const db = require("../../helpers/db");

module.exports = async function (req, res) {
  //We can assume the user is getting or renewing their access token
  if(req.path == "/login" && req.method == "POST"){
    let user = {
      type: "ANONYMOUS",
      personaname: "Anonymous"
    }

    //TODO add get user logic (can't be anonymous of course)
    user = await addUser(user).catch((error) => {
      console.error(error);
    });

    const token = auth.encodeToken(user);

    const response = {
      accessToken: token
    }

    return res.json(response);
  }
  return res.json(config.info);
}

//TODO - move this somewhere smarter
async function addUser(user){
  const userObject = objects.find((object) => object.key == 'users');

  return new Promise((resolve, reject) => {
    db.query(`CALL sp_create_update_user(?,?,?)`, [null, null, user.personaname], (error, results) => {
      if(error) return reject(error);
      resolve(new userObject.model(results[0][0]));
    });
  });
}