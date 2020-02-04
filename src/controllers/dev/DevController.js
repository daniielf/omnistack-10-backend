const Dev = require('../../models/Dev');
const { stringToArray } = require('../../utils/parses');
const axios = require('axios').default;

const { githubURL } = require('../../utils/endpoints');
module.exports = {
  async create (req, resp) {
    console.log('DevController.js', 'POST: /users/create');
    const { username, techs, lat, lng } = req.body;

    const userExists = await Dev.findOne({ github_username: username });
    if (userExists) return resp.status(400).json('User Already Exists');

    const techsArray = techs ? stringToArray(techs) : [];
    console.log(techsArray);
    const location = {
      type: "Point",
      coordinates: [lng, lat]
    };
  
    if (!username) return resp.status(400).json('Not Found - Missing field `username`');
    
    axios.get(githubURL + username).then((response) => {
      let data = response.data;
      const { name = login, avatar_url = '', bio = ''} = data;
  
      Dev.create({
        name,
        github_username: username,
        avatar_url,
        bio,
        techs: techsArray,
        location
      }).then((newDev) => {
        return resp.json({ data: newDev });
      }).catch((err) => {
        console.log('Routes.js', 'POST: /users/create', err);
      });
  
    }).catch((err) => {
      console.log(err);
      resp.status(404).json('Username Not Found');
    });
  },

  async getAll (req, resp) {
    try {
      const devs = await Dev.find();
      return resp.json(devs);
    } catch(e) {
      return resp.status(500).json({"error": true});
    }
  }
};