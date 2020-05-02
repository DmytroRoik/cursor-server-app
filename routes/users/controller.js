const UserModel = require('../../models/user');
const ChargesModel = require('../../models/charge');
const apiBuilder = require('../../helpers/apiBuilder');
const getError = require('../../helpers/error-maker');

const getCurrent = async (req, res) => {
    const data = await new UserModel().getCurrent();
    const totalBalance = await new ChargesModel().getTotalBalance();

    return res.send({ 
        data,
        totalBalance
     })
}

const editUser = async (req, res) => {
    try {
        const data = await new UserModel().edit(req.body);
        return res.send({ data })
    } catch (err) {
        return apiBuilder.builder(res, getError(err, 400));
    }
}

const uploadImage = async (req, res) => {
    const { file } = req;
    const data = await new UserModel().updateAvatar(file.originalname);
    return res.send({ data });
}

module.exports = {
    getCurrent,
    editUser,
    uploadImage
}