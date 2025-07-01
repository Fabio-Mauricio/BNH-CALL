import express from 'express'
const router = express.Router()
import {deleteUserInDatabase, getUserFromDatabase, insertUserToDatabase, updateUserInDatabase, addContactInDatabase, logUserInDatabase, getSearchedUsersFromDatabase, getUserFriendsFromDatabase} from '../../controllers/user.controller.js'
import upload from '../../core/multer.js'

router.get('/getUser/:id', getUserFromDatabase)
router.get('/getUserFriends/:id', getUserFriendsFromDatabase)
router.get('/searchFriends/:name', getSearchedUsersFromDatabase)
router.post('/postUser', upload.single('file'), insertUserToDatabase)
router.put('/putUser/:id', updateUserInDatabase )
router.delete('/deleteUser/:id', deleteUserInDatabase)
router.post('/addContact', addContactInDatabase)
router.post('/loginUser', logUserInDatabase)
router.get('/videoChamada/:room', (req, res) => {
     res.render('room', {roomId: req.query.roomId})
})

export default router