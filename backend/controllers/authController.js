const bcrypt = require("bcrypt");
const userModal = require("../models/UserModal");
const SignUpUser = async (body) => {
    try {
        body.password = bcrypt.hashSync(body.password, 10);
        const user = await userModal.create({ ...body });
        console.log("successfuly send");
        return user;
    }
    catch (error) {
        return error;
    }
}
const LoginUser = async (body) => {
    try {

        const isUserExist = await userModal.findOne({ email: body.email });
        if (isUserExist) {
            console.log("user exists");
        }
        // check user with email if it exsit then compare db password with the incomming password after decrypt
        // console.log(body);
        const match = await bcrypt.compare(body.password, isUserExist.password);
        console.log(match);
        const token=await isUserExist.generateAuthToken();
        // body.password = bcrypt.compareSync(body.password, 10);
        // return user;
    }
    catch (error) {
        return error;
    }
}

module.exports = {
    SignUpUser,
    LoginUser
}