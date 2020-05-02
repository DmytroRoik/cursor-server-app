const IconModel = require('../../models/icon');

const getAll = async (req, res) => {
    const icons = await new IconModel().getAll();
    return res.send({ data: icons })
}

module.exports = {
    getAll
  };