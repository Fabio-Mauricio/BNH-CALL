import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const generateToken = (userInformations) => {
    const secret = process.env.SECRET
    const token = jwt.sign(userInformations, secret, {expiresIn: '7d'})
    return token
}

export default generateToken