const express = require('express')
const router = express.Router()
const notLoggedIn = require('./login_status/notLoggedIn')
const roomController = require('../controllers/rooms_controller')
const isNotAdmin = require('./isAdmin/isNotAdmin')
const isAdmin = require('./isAdmin/isAdmin')

// admin rooms routes
router.get('/admin', notLoggedIn, isNotAdmin, roomController.adminAllRooms) // display all rooms
router.get('/admin/new', notLoggedIn, isNotAdmin, roomController.adminNewRoomsForm) // add new rooms
router.post('/admin', notLoggedIn, isNotAdmin, roomController.adminCreateNewRooms) // create rooms

router.get('/admin/:id/edit', notLoggedIn, isNotAdmin, roomController.adminFormForUpdate) // update form details of 1 room

router.put('/admin/:id', notLoggedIn, isNotAdmin, roomController.adminUpdate)// update button

router.delete('/admin/:id', notLoggedIn, isNotAdmin, roomController.adminRemove) // delete button

// user room reservation routes
router.get('/search', notLoggedIn, isAdmin, roomController.userSearchFieldsValue) // form for selecting fields for searching possible reservations
router.post('/search', notLoggedIn, isAdmin, roomController.userSearchFields) // display list of all posible reservations for user

router.get('/', notLoggedIn, isAdmin, roomController.userListAll)// list all current reservation
router.post('/:id', notLoggedIn, isAdmin, roomController.userCreate) // new reservation

router.delete('/:id', notLoggedIn, isAdmin, roomController.userRemove) // delete reservation button

// REMOVED UPDATE RESERVATION FUNCTIONALITY FOR MVP
// router.get('/:id/edit', notLoggedIn, isAdmin, roomController.userFormForUpdate) //form to update
//
// router.put('/:id', notLoggedIn, isAdmin, roomController.userUpdate)//update reservation button

module.exports = router
