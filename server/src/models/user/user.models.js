import conn from '../../database/db.js'
import bcrypt from 'bcrypt'
const saltRounds = 10
import generateToken from '../../core/generateToken.js'

const getUser = async(req, res) => {
    const id = req.params.id
    const query = `SELECT * FROM users WHERE id = ?`
    const [rows] = await conn.execute(query, [id])
    return rows[0]
}

const postUser = async (req, res) => {
    const file = `http://localhost:8081/uploads/${req.file.filename}`
    
    const {name, email, password, date_birth} = req.body
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
   
         const query = `INSERT INTO users (createdAt, photo, name, email, password, date_birth) VALUES (?, ?, ?, ?, ?, ?)`
        const [result] = await conn.execute(query, [
            createdAt,
            file,
            name,
            email,
            hashedPassword,
            date_birth
        ])
    const userId = result.insertId
    const uniqueId = crypto.randomUUID();
    await conn.execute(
        `INSERT INTO contacts (userId, peerId) VALUES (?, ?)`,
        [userId, uniqueId ]
    )
}

const putUser = async (req, res) => {
    const id = req.params.id
    const {name, email} = req.body
    const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const query = `UPDATE users SET updatedAt = ?, name = ?, email = ? WHERE id = ?`
        conn.execute(query, [
            updatedAt,
            name,
            email,
            id
        ])
}

const deleteUser = (req, res) => {
    const id = req.params.id
    const query = `DELETE FROM users WHERE id = ?`
    conn.execute(query, [
        id
    ])
}

const addContact = async(req, res) => {
    const {id, peerId} = req.body
    const query = `INSERT INTO contacts (userId, peerId) VALUES (?, ?)`
    await conn.execute(query, [id, peerId])
}

const userLogin = async(req, res) => {
    const {email, password} = req.body

    const query = `SELECT * FROM users WHERE email = ?`
    const [rows] = await conn.execute(query, [email])

    if(rows.length > 0) {
    const user = rows[0]

    const match = await bcrypt.compare(password, user.password)
    if (match) {
    
      return generateToken({
        id: user.id,
        image: user.photo,
        username: user.name,
        email: user.email,
        password: user.password,
        date_birth: user.date_birth,
        })
    } else {
      return "wrong password"
    }
    }
    return "user not found"
}

export {postUser, putUser, deleteUser, getUser, addContact, userLogin }