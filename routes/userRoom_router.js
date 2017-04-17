const express = require('express')
const router = express.Router()
const notLoggedIn = require('./login_status/notLoggedIn')
const roomController = require('../controllers/rooms_controller')

//user reservation routes

router.get('/', notLoggedIn, roomController.userSearchFields) //??

router.post('/', notLoggedIn, roomController.userSearchFieldsValue) //??

router.get('/', notLoggedIn, roomController.userListAll)//???

router.get('/:id/edit', notLoggedIn, roomController.userFormForUpdate) //??

router.put('/:id', notLoggedIn, roomController.userUpdate)//update reservation button

router.delete('/', notLoggedIn, roomController.userRemove) //delete reservation button

router.post('/', notLoggedIn, roomController.userCreate) //new reservation button



router.get('/:id', notLoggedIn, roomController.userShowOne) // ??




router.get('/', notLoggedIn, roomController.adminAllRooms) //display all rooms
router.get('/new', notLoggedIn, roomController.adminNewRoomsForm) //add new rooms
router.post('/', notLoggedIn, roomController.adminCreateNewRooms) //create rooms

router.get('/:id', notLoggedIn, roomController.adminShowOne) // show 1 room details

router.get('/:id/edit', notLoggedIn, roomController.adminFormForUpdate) //update form details of 1 room

router.put('/:id', notLoggedIn, roomController.adminUpdate)//update button

router.delete('/:id', notLoggedIn, roomController.adminRemove) //delete button

// const todoController = require('../controllers/todo_controller')
//
// router.get('/new', todoController.new)
// router.get('/:id/edit', todoController.edit)
//
// router.get('/', todoController.list)
//
// router.get('/:id', todoController.listOne)
//
//
// router.post('/', todoController.create)
//
// router.put('/:id', todoController.update)
//
// router.delete('/:id', todoController.delete)

module.exports = router
