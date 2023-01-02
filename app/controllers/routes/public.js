const config = require("../../config/config");
const auth = require("../../helpers/auth");

module.exports = function (req, res) {
  //We can assume the user is getting or renewing their access token
  if(req.path == "/login" && req.method == "POST"){
    const data = {
      type: "ANONYMOUS",
      name: "Anonymous"
    }

    const token = auth.encodeToken(data);

    const response = {
      accessToken: token
    }

    return res.json(response);
  }
  return res.json(config.info);
}