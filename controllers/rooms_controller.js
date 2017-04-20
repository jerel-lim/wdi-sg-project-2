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
    // to parse string values of dates from POST to dates
    var startDate = new Date(req.body.startDate)
    var adjustedStartDate = new Date(startDate)
    var startDateMinus1 = adjustedStartDate.setDate(adjustedStartDate.getDate() - 1)

    var endDate = new Date(req.body.endDate)
    var adjustedEndDate = new Date(endDate)
    var endDatePlus1 = adjustedEndDate.setDate(adjustedEndDate.getDate() + 1)

    var originalStart = new Date(req.body.originalStart)

    var originalEnd = new Date(req.body.originalEnd)

// need to set status to false (room reserved for duration requested)
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
    // create new room of duration before the booking
    if (originalStart <= startDateMinus1) {
      var newRoom2 = new Room({
        beds: parseInt(req.body.beds),
        price: parseInt(req.body.price),
        dateFrom: originalStart,
        dateTo: startDateMinus1,
        status: true
      })
      newRoom2.save(function (err, savedEntry) {
        if (err) throw err
      })
    }
    // to merge rooms with similar original start dates

    // create new room of duration after the booking
    if (endDatePlus1 <= originalEnd) {
      var newRoom3 = new Room({
        beds: parseInt(req.body.beds),
        price: parseInt(req.body.price),
        dateFrom: endDatePlus1,
        dateTo: originalEnd,
        status: true
      })
      newRoom3.save(function (err, savedEntry) {
        if (err) throw err
      })
    }
  // update original booking to false status since it is broken up into the 3 parts above(newRooms 1,2 and 3).
    Room.findByIdAndUpdate(req.params.id, { $set: { status: false}}, function (err, output) {
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
      ] }, function (err, rooms) {
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
    // finding room by the deleted room ID
    Room.findById(req.params.id, function (err, reservation) {
      if (err) {
        throw err
      }

      // parsing dates of the deleted room ID to plus 1 day and minus 1 day for merging
      var originalEnd = new Date(reservation.dateTo)
      var adjustedOriginalEnd = new Date(originalEnd)
      var originalEndPlus1 = adjustedOriginalEnd.setDate(adjustedOriginalEnd.getDate() + 1)
      var originalStart = new Date(reservation.dateFrom)
      var adjustedOriginalStart = new Date(originalStart)
      var originalStartMinus1 = adjustedOriginalStart.setDate(adjustedOriginalStart.getDate() - 1)
      // find room which match the deleted room date -1 (one of the 3 rooms that were created in the above create function), and update the status to false, so it is not considered available anymore.
      Room.findOneAndUpdate({$and: [{beds: reservation.beds, price: reservation.price, dateTo: originalStartMinus1, status: true }
      ] }, { $set: {status: false}}, {new: true}, function (err, doc) {
        if (err) {
          throw err
        }
        // find the other room that was created, and merge the dates of the rooms so the entire availability duration is captured
        Room.findOneAndUpdate({$and: [{beds: reservation.beds, price: reservation.price, dateFrom: originalEndPlus1, status: true }
        ] }, { $set: { dateFrom: doc.dateFrom }}, {new: true}, function (err, doc) {
          if (err) {
            throw err
          }
          // find the deleted room and change status to false.
          Room.findByIdAndUpdate(req.params.id, { $set: { status: false}}, function (err, output) {
            if (err) throw err
            console.log(req.user.reservations_id, 'req.user')
            var deletedroomId = req.params.id
            var userRooms = req.user.reservations_id
            userRooms.splice(userRooms.indexOf(deletedroomId), 1)
            req.user.save()
            req.flash('success', 'You have deleted your reservation.')
            res.redirect('/rooms')
          })
        })
      })
    })
  },

  adminAllRooms: function (req, res) {
    Room.find({}, (err, rooms) => {
      if (err) throw err
      res.render('rooms/adminListAll', { allRooms: rooms})
    })
  },

  adminNewRoomsForm: function (req, res) {
    res.render('rooms/adminAddRoom')
  },

  adminCreateNewRooms: function (req, res) {
    console.log(req.body)
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
        status: true
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
