const Dev = require('../../models/Dev');
const { stringToArray } = require('../../utils/parses');

module.exports = {
  async getAllInRange(req, resp) {
    const {  } = req.params.range;
    if (!range) return resp.status(400).json({messsage: "Param 'range' not found"});

    resp.json({ count: 0, range, data: [] });
  },

  async searchInRange(req, resp) {
    const { range, lat, lng, techs } = req.body;
    const techsArray = techs? stringToArray(techs) : [];
    if (!lat) return resp.status(400).json({message: "Param 'lat' not Found"});
    if (!lng) return resp.status(400).json({message: "Param 'lng' not Found"});

    const searchParams = {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          $maxDistance: range ? range : 10000
        }
      }
    };

    if (techsArray.length > 0) {
      searchParams['techs'] = { $in : techsArray };
    }
    
    Dev.find(searchParams).then((devs) => {
      return resp.json(devs);
    }).catch((err) => {
      console.log(err);
      return resp.status(400).json(err);

    });

  }
}