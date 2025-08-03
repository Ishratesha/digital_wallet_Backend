import bcrypt from "bcrypt";
import httpStatus from "http-status-codes";
import { envVars } from "../../config/env";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import AppError from "../../middlewares/AppError";
import { generateToken } from "../../utiles/jwt";


const credentialsLogin = async (payload: Partial<IUser>) => {
    const { phoneNumber, password } = payload;

    const isUserExist = await User.findOne({ phoneNumber })

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist")
    }

    const isPasswordMatched = await bcrypt.compare(password as string, isUserExist.password as string)

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
    }
    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    }
    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)

    return {
       accessToken
    }

}

//user - login - token (email, role, _id) - booking / payment / booking / payment cancel - token 

export const AuthServices = {
    credentialsLogin
}