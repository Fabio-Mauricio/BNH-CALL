import { postBlog, getPosts } from "../models/blog.models.js"

const insertPostInDatabase = async(req, res) => {
    try {
        postBlog(req, res)
        return res.status(200).json({message: 'Post added with success'})
    } catch(e) {
        console.log('Houve um erro', e)
        return res.status(500).json({message: 'Error adding post'})
    }
}

const getPostsFromDatabase = async(req, res) => {
    try {
        await getPosts(req, res)
        return res.status(200).json(await getPosts(req, res))
        
    } catch(e) {
        console.log('Houve um erro', e)
        return res.status(500).json({message: 'Error geting posts'})
    }
}
 
export {insertPostInDatabase, getPostsFromDatabase}