const config = require("../../config/config");
const auth = require("../../helpers/auth");
const dbController = require("../db");

module.exports = async function (req, res) {
  //We can assume the user is getting or renewing their access token
  if(req.path == "/login" && req.method == "POST"){
    return await login(req, res).catch((error) => {
      console.error(error);
    });
  }

  return res.json(config.info);
}

async function login(req, res){
  const steamId = req.body.steamId;
  const personaname = req.body.personaname ? req.body.personaname : "Anonymous"

  let user = {
    type: "ANONYMOUS",
    steamId: steamId,
    personaname: personaname
  }

  if(steamId){
    user = await verifySteamId(user).catch((error) => {
      console.error(error);
    });
  }

  user = await dbController.addUser(user).catch((error) => {
    console.error(error);
  });

  const token = auth.encodeToken(user);

  const response = {
    accessToken: token
  }

  return res.json(response);
}

//TODO finish steam integration here...
async function verifySteamId(user){
  return user;
}