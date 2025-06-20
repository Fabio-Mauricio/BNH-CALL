import express from 'express'
const router = express.Router()
import {deleteUserInDatabase, getUserFromDatabase, insertUserToDatabase, updateUserInDatabase, addContactInDatabase, logUserInDatabase} from '../../controllers/user.controller.js'
import upload from '../../core/multer.js'

router.get('/getUser/:id', getUserFromDatabase)
router.post('/postUser', upload.single('file'), insertUserToDatabase)
router.put('/putUser/:id', updateUserInDatabase )
router.delete('/deleteUser/:id', deleteUserInDatabase)
router.post('/addContact', addContactInDatabase)
router.post('/loginUser', logUserInDatabase)

export default router