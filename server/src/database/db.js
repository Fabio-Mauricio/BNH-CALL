import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config() 

let conn

try {
    conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
}) 
    console.log('success')
    }
    catch(e) {
    console.log(e)
}
export default conn