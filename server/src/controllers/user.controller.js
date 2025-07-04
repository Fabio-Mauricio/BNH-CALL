import { postUser, putUser, deleteUser, getUser, addContact,userLogin  } from "../models/user/user.models.js";
import conn from "../database/db.js";


const getUserFromDatabase = async (req, res) => {
    try {
        const user = await getUser(req, res)
        return res.status(200).json(user)
        } catch(e) {
        console.log('Houve um erro:', e)
        return res.status(500).json({message: 'Error adding user'})
    }
}

const insertUserToDatabase = async(req, res) => {
     try {
        const verifyUserExists = async (email) => {    
            const query = `SELECT * FROM users WHERE email = ?`
            const [result] = await conn.execute(query, [email])
            return result.length > 0
        }

        const userExists = await verifyUserExists(req.body.email)
        if(!userExists) {
            postUser(req, res)
            return res.status(200).json({message: 'User inserted with success'})
        }
        else {
            return res.status(200).json({message: 'Usuário já existe'})
        }
        } catch(e) {
        console.log('Houve um erro:', e)
        return res.status(500).json({message: 'Error adding user'})
    }
}

const updateUserInDatabase = (req, res) => {
     try {
        putUser(req, res)
        return res.status(200).json({message: 'User updated with success'})
        } catch(e) {
        console.log('Houve um erro:', e)
        return res.status(500).json({message: 'Error adding user'})
    }
}

const deleteUserInDatabase = (req, res) => {
     try {
        deleteUser(req, res)
        return res.status(200).json({message: 'User deleted with success'})
        } catch(e) {
        console.log('Houve um erro:', e)
        return res.status(500).json({message: 'Error adding user'})
    }
}

const addContactInDatabase = (req, res) => {
    try {
        addContact(req, res)
        return res.status(200).json({message: 'Contact added with success'})
        } catch(e) {
        console.log('Houve um erro:', e)
        return res.status(500).json({message: 'Error adding contact'})
    }
}
 
const logUserInDatabase = async(req, res) => {
    try {
        if(await userLogin(req, res) == 'wrong password') return res.status(201).json({message: 'wrong password'})
        if(await userLogin(req, res) == 'user not found') return res.status(201).json({message: 'user not found'})
        return res.status(200).json(await userLogin(req, res))
    } catch(e) {
        console.log('Houve um erro', e)
        return res.status(500).json({message: 'Error loggin user'})
    }
}
 
export {insertUserToDatabase, updateUserInDatabase, deleteUserInDatabase, getUserFromDatabase, addContactInDatabase, logUserInDatabase}