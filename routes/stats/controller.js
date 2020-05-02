const Charges = require('../../modules/charges');

const getStats = async (req, res) => {
    const { from } = req.query;
    const stats = await new Charges().getStats(from);
    return res.send({ data: stats })
}

module.exports = {
    getStats
}