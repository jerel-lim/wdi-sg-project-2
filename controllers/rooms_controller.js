const Room = require('../models/room')
const User = require('../models/user')

let roomController = {
  userListAll: function (req, res) {
    User.findById(req.user._id).populate('reservations_id').exec(function (err, user) {
      if (err) res.redirect('/login')
      res.render('rooms/index', {user: user})
    })
  },

  userCreate: function (req, res) {
    var startDate = new Date(req.body.startDate)
    var endDate = new Date(req.body.endDate)
    var originalStart = new Date(req.body.originalStart)
    var originalEnd = new Date(req.body.originalEnd)
    var adjustedStartDate = new Date(startDate)
    var startDateMinus1 = adjustedStartDate.setDate(adjustedStartDate.getDate() - 1)
    var adjustedEndDate = new Date(endDate)
    var endDatePlus1 = adjustedEndDate.setDate(adjustedEndDate.getDate() + 1)

// need to set status to false
    var newRoom1 = new Room({
      beds: parseInt(req.body.beds),
      price: parseInt(req.body.price),
      dateFrom: startDate,
      dateTo: endDate,
      status: false
    })
    newRoom1.save(function (err, savedEntry) {
      if (err) throw err
    })
    var newRoom2 = new Room({
      beds: parseInt(req.body.beds),
      price: parseInt(req.body.price),
      dateFrom: originalStart,
      dateTo: startDateMinus1,
      status: true,
      createdByBooking: [newRoom1.id]
    })
    newRoom2.save(function (err, savedEntry) {
      if (err) throw err
    })
    var newRoom3 = new Room({
      beds: parseInt(req.body.beds),
      price: parseInt(req.body.price),
      dateFrom: endDatePlus1,
      dateTo: originalEnd,
      status: true,
      createdByBooking: [newRoom1.id]
    })
    newRoom3.save(function (err, savedEntry) {
      if (err) throw err
    })
    Room.findByIdAndUpdate(req.params.id, { $set: { status: false}, $push: { createdByBooking: newRoom1.id }}
  , function (err, output) {
    if (err) throw err
  })
    var userRooms = req.user.reservations_id
    userRooms.push(newRoom1)
    req.user.save()
    res.redirect('/rooms')
  },

  userSearchFieldsValue: function (req, res) {
    res.render('rooms/show')
  },

  userSearchFields: function (req, res) {
    if (!req.body.dateFrom || !req.body.dateTo) {
      req.flash('error', 'Please fill in dates')
      res.redirect('/rooms/search')
    }
    if (req.body.dateFrom > req.body.dateTo) {
      req.flash('error', 'From Date is later than To Date')
      res.redirect('/rooms/search')
    }
    if (req.body.beds < 0 || !req.body.beds) {
      req.flash('error', 'Please fill in valid number of beds')
      res.redirect('/rooms/search')
    }
    if (!req.body.price) {
      req.body.price = 99999999999999
    }
    Room.find(
      {$and: [{beds: parseInt(req.body.beds)},
        {price: {$lte: parseInt(req.body.price)}},
        {dateFrom: { $lte: req.body.dateFrom}},
        {dateTo: {$gte: req.body.dateTo}},
        {status: true}
      ] }, // add in option for no beds
        // dateFrom: { $lte: req.body.dateFrom}, // dates wrong?
        // dateTo: {$gte: req.body.dateTo},
        // price: { $lte: parseInt(req.body.price)}], // to add in option for no price
         function (err, rooms) {
           if (err) throw err
           res.render('rooms/new', { allAvailableRooms: rooms,
             dateSearchFrom: req.body.dateFrom,
             dateSearchTo: req.body.dateTo })
         })
  },
  // //////////////////REMOVED UPDATE RESERVATION FUNCTIONALITY FOR MVP

  // userFormForUpdate: function (req, res) {
  //   Room.findById(req.params.id, function (err, roomToEdit) {
  //     if (err) throw err
  //     res.render('rooms/edit', {
  //       roomToEdit: roomToEdit
  //     })
  //   })
  // },
//

//   userUpdate: function (req, res) {
//     if (req.body.dateFrom > req.body.dateTo) {
//       req.flash('error', 'From Date is later than To Date')
//       res.redirect('/rooms/' + req.params.id + '/edit')
//     }
// console.log(req.body)
//     var editedDateFrom = new Date(req.body.dateFrom)
//     var editedDateTo = new Date(req.body.dateTo)
//     var originalStart = new Date(req.body.originalStart)
//     var originalEnd = new Date(req.body.originalEnd)
//     var adjustedStartDate = new Date(editedDateFrom);
//     var startDateMinus1 = adjustedStartDate.setDate(adjustedStartDate.getDate() - 1)
//     var adjustedEndDate = new Date(editedDateTo);
//     var endDatePlus1 = adjustedEndDate.setDate(adjustedEndDate.getDate() + 1)
//
//     Room.findByIdAndUpdate(req.params.id, { $set: { dateFrom: editedDateFrom, dateTo: editedDateTo}}, function (err, output) {
//       if (err) throw err
//     })
// if (originalStart>editedDateFrom){
//     var newRoom1 = new Room({
//       beds: parseInt(req.body.beds),
//       price: parseInt(req.body.price),
//       dateFrom: originalStart,
//       dateTo: startDateMinus1,
//       status: true
//     })
//     newRoom1.save(function (err, savedEntry) {
//           if (err) throw err
//     })
//   }
//   else {
//     var newRoom1 = new Room({
//       beds: parseInt(req.body.beds),
//       price: parseInt(req.body.price),
//       dateFrom: originalStart,
//       dateTo: startDateMinus1,
//       status: true
//     })
//     newRoom1.save(function (err, savedEntry) {
//           if (err) throw err
//     })
//
//   }
//     var newRoom2 = new Room({
//       beds: parseInt(req.body.beds),
//       price: parseInt(req.body.price),
//       dateFrom: endDatePlus1,
//       dateTo: originalEnd,
//       status: true
//     })
//     newRoom2.save(function (err, savedEntry) {
//           if (err) throw err
//     })
//
//       req.flash('success', 'You have edited your reservation.')
//       res.redirect('/rooms')
//   },

  userRemove: function (req, res) {
    Room.update({createdByBooking: [req.params.id], status: true }, { $set: { status: false}})

    Room.findByIdAndUpdate(req.params.id, { $set: { status: true}}, function (err, output) {
      if (err) throw err
      console.log(req.user.reservations_id, 'req.user')
      var deletedroomId = req.params.id
      var userRooms = req.user.reservations_id
      userRooms.splice(userRooms.indexOf(deletedroomId), 1)
      req.user.save()
      req.flash('success', 'You have deleted your reservation.')
      res.redirect('/rooms')
    })
  },

  adminAllRooms: function (req, res) {
    Room.find({status: true}, (err, rooms) => {
      if (err) throw err
      res.render('rooms/adminListAll', { allRooms: rooms})
    })
  },

  adminNewRoomsForm: function (req, res) {
    res.render('rooms/adminAddRoom')
  },

  adminCreateNewRooms: function (req, res) {
    if (!req.body.beds || req.body.beds < 1) {
      req.flash('error', 'Please set number of beds')
      res.redirect('/rooms/admin/new')
    } else if (req.body.dateFrom > req.body.dateTo) {
      req.flash('error', 'From Date is later than To Date')
      res.redirect('/rooms/admin/new')
    } else if (!req.body.dateFrom || !req.body.dateTo) {
      req.flash('error', 'Please enter From Date and To Date')
      res.redirect('/rooms/admin/new')
    } else if (!req.body.price || req.body.price < 1) {
      req.flash('error', 'Please set price of room per day')
      res.redirect('/rooms/admin/new')
    } else {
      var newRoom = new Room({
        beds: req.body.beds,
        price: req.body.price,
        dateFrom: req.body.dateFrom,
        dateTo: req.body.dateTo,
        status: false
      })
      newRoom.save(function (err, savedEntry) {
        if (err) throw err
        res.redirect('/rooms/admin')
      })
    }
  },

  adminFormForUpdate: function (req, res) {
    Room.findById(req.params.id, function (err, room) {
      if (err) throw err
      res.render('rooms/adminEdit', { toUpdateRoom: room })
    })
  },

  adminUpdate: function (req, res) {
    if (req.body.dateFrom > req.body.dateTo) {
      req.flash('error', 'From Date is later than To Date')
      res.redirect('/rooms/admin/' + req.params.id + '/edit')
    } else if (!req.body.dateFrom || !req.body.dateTo) {
      req.flash('error', 'Please enter From Date and To Date')
      res.redirect('/rooms/admin/' + req.params.id + '/edit')
    } else if (req.body.price < 1) {
      req.flash('error', 'Please set price of room per day')
      res.redirect('/rooms/admin/' + req.params.id + '/edit')
    } else {
      var editedDateFrom = req.body.dateFrom
      var editedDateTo = req.body.dateTo
      var editedPrice = req.body.price
      Room.findByIdAndUpdate(req.params.id, {$set: {dateFrom: editedDateFrom, dateTo: editedDateTo, price: editedPrice }}, function (err, output) {
        if (err) throw err
        req.flash('success', 'You have successfully edited room details.')
        res.redirect('/rooms/admin')
      })
    }
  },

  adminRemove: function (req, res) {
    Room.findByIdAndRemove(req.params.id, function (err, room) {
      if (err) throw err
      res.redirect('/rooms/admin')
    })
  }
}

module.exports = roomController
