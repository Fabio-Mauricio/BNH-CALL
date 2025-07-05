import conn from "../database/db.js"

const postBlog = async(req, res) => {
    const {title, content} = req.body
    const query = `INSERT INTO posts (title, content) VALUES (?, ?) `
    conn.execute(query, [title, content])
}

const getPosts = async(req, res) => {
     const [rows] = await conn.query(
        `SELECT * FROM posts`)
    return rows
}

export { postBlog, getPosts}