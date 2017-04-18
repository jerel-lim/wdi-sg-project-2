const Room = require('../models/room')
const User = require('../models/user')

let roomController = {
  userListAll: function (req, res) {
    User.findOne(req.user).populate('reservations_id').exec( function (err, user) {
      console.log(user, 'user details')
      if (err) res.redirect('/login')
      res.render('rooms/index', {user: user})
    })
  },

  userCreate: function (req, res) {
var startDate = new Date(req.body.startDate)
var endDate = new Date(req.body.endDate)
var originalStart = new Date(req.body.originalStart)
var originalEnd = new Date(req.body.originalEnd)
var adjustedStartDate = new Date(startDate);
var startDateMinus1 = adjustedStartDate.setDate(adjustedStartDate.getDate() - 1)
var adjustedEndDate = new Date(startDate);
var endDatePlus1 = adjustedEndDate.setDate(adjustedEndDate.getDate() + 1)

//need to set status to false
Room.findByIdAndUpdate(req.params.id, { $set: { status: false}}, function (err, output) {
  if (err) throw err
})
var newRoom1 = new Room({
  beds: parseInt(req.body.beds),
  price: parseInt(req.body.price),
  dateFrom: originalStart,
  dateTo: startDateMinus1,
  status: true
})
newRoom1.save(function (err, savedEntry) {
      if (err) throw err
})
var newRoom2 = new Room({
  beds: parseInt(req.body.beds),
  price: parseInt(req.body.price),
  dateFrom: endDatePlus1,
  dateTo: originalEnd,
  status: true
})
newRoom2.save(function (err, savedEntry) {
      if (err) throw err
})
var newRoom3 = new Room({
  beds: parseInt(req.body.beds),
  price: parseInt(req.body.price),
  dateFrom: startDate,
  dateTo: endDate,
  status: false
})
newRoom3.save(function (err, savedEntry) {
      if (err) throw err
})
var userRooms = req.user.reservations_id
    userRooms.push(newRoom3)
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
    if (req.body.beds < 0 ||!req.body.beds) {
      req.flash('error', 'Please fill in valid number of beds')
      res.redirect('/rooms/search')
    }
    if (!req.body.price){
      req.body.price = 99999999999999
    }
    Room.find(
      {$and: [{beds:  parseInt(req.body.beds)},
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
      dateSearchFrom:req.body.dateFrom,
      dateSearchTo:req.body.dateTo })
    })
  },

  userFormForUpdate: function (req, res) {
    Room.findById(req.params.id, function (err, roomToEdit) {
      if (err) throw err
      res.render('rooms/edit', {
        roomToEdit: roomToEdit
      })
    })
  },

  userUpdate: function (req, res) {
    if (req.body.dateFrom > req.body.dateTo) {
      req.flash('error', 'From Date is later than To Date')
      res.redirect('/rooms/' + req.params.id + '/edit')
    }
    var editedDateFrom = req.body.dateFrom
    var editedDateTo = req.body.dateTo
    Room.findByIdAndUpdate(req.params.id, { $set: { dateFrom: editedDateFrom, dateTo: editedDateTo}}, function (err, output) {
      if (err) throw err
      req.flash('success', 'You have edited your reservation.')
      res.redirect('/rooms')
    })
  },

  userRemove: function (req, res) {
    Room.findByIdAndRemove(req.params.id, function (err, room) {
      if (err) throw err
      req.flash('success', 'You have deleted your reservation.')
      // var deletedroomId = req.params.id
      // var userRooms = req.user.reservation_id
      // userRooms.splice(userRooms.indexOf(deletedIssueId), 1)
      // req.user.save()
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
    }
    else if (req.body.dateFrom > req.body.dateTo) {
      req.flash('error', 'From Date is later than To Date')
      res.redirect('/rooms/admin/new')
    }
    else if (!req.body.dateFrom || !req.body.dateTo) {
      req.flash('error', 'Please enter From Date and To Date')
      res.redirect('/rooms/admin/new')
    }
    else if (!req.body.price || req.body.price < 1) {
      req.flash('error', 'Please set price of room per day')
      res.redirect('/rooms/admin/new')
    }
    else {
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
    }
    else if (!req.body.dateFrom || !req.body.dateTo) {
      req.flash('error', 'Please enter From Date and To Date')
      res.redirect('/rooms/admin/' + req.params.id + '/edit')
    }
    else if (req.body.price < 1) {
      req.flash('error', 'Please set price of room per day')
      res.redirect('/rooms/admin/' + req.params.id + '/edit')
    }
else{
    var editedDateFrom = req.body.dateFrom
    var editedDateTo = req.body.dateTo
    var editedPrice = req.body.price
    Room.findByIdAndUpdate(req.params.id, { $set: {dateFrom: editedDateFrom, dateTo: editedDateTo, price: editedPrice }}, function (err, output) {
      if (err) throw err
      req.flash('success', 'You have successfully edited room details.')
      res.redirect('/rooms/admin')
    })
}
  },

  adminRemove: function(req,res){
    Room.findByIdAndRemove(req.params.id, function (err, room){
      if (err) throw err
      res.redirect('/rooms/admin')
    })
  }
  //
  // show: function (req, res, next) {
  //   Room.findById(req.params.id).populate('user_id').exec(function (err, output) {
  //     if (err) return next(err)
  //     res.render('rooms/show', {
  //       issue: output
  //     })
  //   })
  // },
  //
  //
  // listOne: (req, res) => {
  //   Todo.findById(req.params.id, (err, todoItem) => {
  //     if (err) throw err
  //     res.render('rooms/show', { todoItem: todoItem })
  //   })
  // },
  //
  // create: (req, res) => {
  //   let newTodo = new Todo({
  //     title: req.body.title,
  //     description: req.body.description,
  //     completed: false
  //   })
  //   newTodo.save(function (err, savedEntry) {
  //     if (err) throw err
  //     res.redirect('/rooms')
  //   })
  // },
  //
  // edit: (req, res) => {
  //   Todo.findById(req.params.id, (err, todoItem) => {
  //     if (err) throw err
  //     res.render('todo/edit', { todoItem: todoItem })
  //   })
  // },
  //
  // update: (req, res) => {
  //   Todo.findOneAndUpdate({
  //     _id: req.params.id
  //   }, {
  //     title: req.body.title,
  //     description: req.body.description,
  //     completed: req.body.completed
  //   }, (err, todoItem) => {
  //     if (err) throw err
  //     res.redirect('/todos/' + todoItem.id)
  //   })
  // },
  //
  // delete: (req, res) => {
  //   Room.findByIdAndRemove(req.params.id, (err, todoItem) => {
  //     if (err) throw err
  //     res.redirect('/rooms')
  //   })
  // }

    //
    //
    //
    // list: function (req, res) {
    //   Room.find({}).populate('user_id').exec(function (err, output) {
    //     res.render('issues/index', {
    //       issues: output,
    //       flash: req.flash('flash')[0]
    //     })
    //   })
    // },
    // new: function (req, res) {
    //   res.render('issues/new')
    // },
    // show: function (req, res, next) {
    //   Issue.findById(req.params.id).populate('user_id').exec(function (err, output) {
    //     if (err) return next(err)
    //     res.render('issues/show', {
    //       issue: output
    //     })
    //   })
    // },
    // create: function (req, res) {
    //   var newIssue = new Issue({
    //     title: req.body.issues.title,
    //     address: req.body.issues.address,
    //     problem: req.body.issues.problem,
    //     dateCreated: req.body.issues.dateCreated,
    //     user_id: req.user._id,
    //     isFixed: req.body.issues.isFixed
    //   })
    //
    //   // var valErr = newIssue.validateSync()
    //   // if (valErr) {
    //   //   console.log('error')
    //   //   req.flash('flash', {
    //   //     type: 'danger',
    //   //     message: 'Validation Error'
    //   //   })
    //   //   res.redirect('/issues/new')
    //   // }
    //
    //   newIssue.save(function (err, output, next) {
    //     if (err) {
    //       if (err.name === 'ValidationError') {
    //         let errorMessages = []
    //         for (field in err.errors) {
    //           errorMessages.push(err.errors[field].message)
    //         }
    //         req.flash('flash', {
    //           type: 'danger',
    //           message: errorMessages
    //         })
    //         res.redirect('issues')
    //       }
    //       return next(err)
    //     }
    //     req.flash('flash', {
    //       type: 'success',
    //       message: 'New issue request successfully created: ' + output.title
    //     })
    //     var userIssues = req.user.local.issue_id
    //     userIssues.push(newIssue)
    //     req.user.save()
    //     res.redirect('issues')
    //   })
    // },
    // findForUpdate: function (req, res, next) {
    //   Issue.findById(req.params.id, function (err, issueToEdit) {
    //     if (err) return next(err)
    //     res.render('issues/edit', {
    //       issueToEdit: issueToEdit
    //     })
    //   })
    // },
    // update: function (req, res, next) {
    //   var editedIssue = req.body.issues
    //   Issue.findByIdAndUpdate(req.params.id, editedIssue, function (err, output) {
    //     if (err) return next(err)
    //     req.flash('flash', {
    //       type: 'success',
    //       message: 'Issue request successfully edited'
    //     })
    //     res.redirect('/issues')
    //   })
    // },
    // fix: function (req, res, next) {
    //   Issue.findByIdAndUpdate(req.params.id, {
    //     isFixed: req.query.isFixed
    //   }, function (err, output) {
    //     if (err) return next(err)
    //     if (req.query.isFixed === 'true') {
    //       req.flash('flash', {
    //         type: 'success',
    //         message: 'Issue solved! You go-getter!'
    //       })
    //     }
    //     if (req.query.isFixed === 'false') {
    //       req.flash('flash', {
    //         type: 'danger',
    //         message: 'Issue re-opened. Get back on it!'
    //       })
    //     }
    //     res.redirect('/issues')
    //   })
    // },
    // remove: function (req, res, next) {
    //   Issue.findByIdAndRemove(req.params.id, function (err, output) {
    //     if (err) return next(err)
    //     req.flash('flash', {
    //       type: 'warning',
    //       message: 'Deleted an issue'
    //     })
    //     var deletedIssueId = req.params.id
    //     var userIssues = req.user.local.issue_id
    //     userIssues.splice(userIssues.indexOf(deletedIssueId), 1)
    //     req.user.save()
    //     res.redirect('/issues')
    //   })
    // }
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

}

module.exports = roomController
