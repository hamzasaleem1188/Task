const bcrypt = require("bcrypt");
const userModal = require("../models/UserModal");
const jwtToken = require("../utils");
const SignUpUser = async (body) => {
    try {
        const isAlreadyUser = await userModal.findOne({ email: body.email });
        console.log(isAlreadyUser);
        if (isAlreadyUser) {
            return {
                status: 0,
                message: "user already exist"
            }
        }
        else {
            body.password = bcrypt.hashSync(body.password, 10);
            const user = await userModal.create({ ...body });
            console.log("successfuly send");
            const token = jwtToken({ id: user._id, email: user.email })
            // body.password = bcrypt.compareSync(body.password, 10);
            return { ...user, token };

        }
    }
    catch (error) {
        return error;
    }
}
const LoginUser = async (body) => {
    try {

        const user = await userModal.findOne({ email: body.email });
        if (!user) {
            return {
                status: 0,
                message: "user does not exist"
            }

        }
        else {

            const match = await bcrypt.compare(body.password, user.password);
            const token = jwtToken({ id: user._id, email: user.email });
            console.log(token);
            return { ...user, token };
        }

    }
    catch (error) {
        return error;
    }
}

module.exports = {
    SignUpUser,
    LoginUser
}