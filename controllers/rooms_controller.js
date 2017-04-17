const Room = require('../models/room')
let roomController = {
  searchForm: function (req, res) {
    res.render('rooms/show')
  },

  list: (req, res) => {
    Room.find({}, (err, rooms) => {
      if (err) throw err
      res.render('rooms/new', { allAvailableRooms: rooms })
    })
  },

  new: (req, res) => {
    res.render('rooms/new')
  },

  show: function (req, res, next) {
    Room.findById(req.params.id).populate('user_id').exec(function (err, output) {
      if (err) return next(err)
      res.render('rooms/show', {
        issue: output
      })
    })
  },


  listOne: (req, res) => {
    Todo.findById(req.params.id, (err, todoItem) => {
      if (err) throw err
      res.render('rooms/show', { todoItem: todoItem })
    })
  },

  create: (req, res) => {
    let newTodo = new Todo({
      title: req.body.title,
      description: req.body.description,
      completed: false
    })
    newTodo.save(function (err, savedEntry) {
      if (err) throw err
      res.redirect('/rooms')
    })
  },

  edit: (req, res) => {
    Todo.findById(req.params.id, (err, todoItem) => {
      if (err) throw err
      res.render('todo/edit', { todoItem: todoItem })
    })
  },

  update: (req, res) => {
    Todo.findOneAndUpdate({
      _id: req.params.id
    }, {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed
    }, (err, todoItem) => {
      if (err) throw err
      res.redirect('/todos/' + todoItem.id)
    })
  },

  delete: (req, res) => {
    Room.findByIdAndRemove(req.params.id, (err, todoItem) => {
      if (err) throw err
      res.redirect('/rooms')
    })
  }



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
