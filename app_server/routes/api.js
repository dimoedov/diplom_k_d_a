let mongoose = require('mongoose');
let config = require('../config/database');
let express = require('express');
let jwt = require('jsonwebtoken');
let router = express.Router();
let User = require("../models/user");
let CarFix = require("../models/carfix");
let Service = require("../models/service");
let Object = require("../models/object");
let client = require("../models/client");

router.post('/signup', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    let newUser = new User({
      last_name: req.body.last_name,
      name: req.body.name,
      middle_name: req.body.middle_name,
      username: req.body.username,
      password: req.body.password,
      position: req.body.position
    });
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/signin', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        console.log(isMatch);
        if (isMatch && !err) {

          let token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 60 // 1 min
          });
          res.cookie('Authorized',token);
          res.cookie('id',user._id);
          res.json({success: true,position: user.position, user: user.last_name+' '+user.name, token: 'JWT ' + token});
        } else {
          res.status(400).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

router.get('/signout', function(req, res) {
  res.cookie('Authorized',null,{
    maxAge: 1
  });
  res.json({success: true, msg: 'signout'});
});

router.post('/carfix', function(req, res) {
  let token = req.cookies.Authorized;
  if (token !== null) {
    let newCarFix = new CarFix({
      kind_of_work: req.body.kind_of_work,
      service: req.body.service,
      engineer: req.body.engineer,
      customer: req.cookies.id,
      price: req.body.price
    });

    newCarFix.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save CarFix failed.'});
      }
      res.json({success: true, msg: 'Successful created new CarFix.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/carfix', function(req, res) {
  let token = req.cookies;
  if (token !== null) {
    CarFix.find({
      customer: req.cookies.id
    },function (err, CarFix) {
      if (err) return next(err);
      res.json(CarFix);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.delete('/carfix/delete/:id', function (req, res) {
let mass = req.body.selected.split(',');
  let token = req.cookies.Authorized;
  if (token !== null) {
      CarFix.deleteMany({
        _id: mass
      }, function (err) {
        if (err) {
          return res.json({success: false, msg: 'Delete CarFix failed.'});
        } else {
          return res.json({success: true, msg: 'Successful Delete ' + req.params.id});
        }
      })
    }
});

router.patch('/carfix/upgrade', function (req, res) {
  let token = req.cookies.Authorized;
  if (token !== null){
    CarFix.findById(req.body._id, (err, CarFix) => {
      if(err){
        return res.json({success: false, msg: 'Not found.'});
      }
      console.log(req.body);
      if(req.body.kind_of_work){
        CarFix.kind_of_work = req.body.kind_of_work;
      }
      if(req.body.service){
        CarFix.service = req.body.service;
      }
      if(req.body.engineer){
        CarFix.engineer = req.body.engineer;
      }
      if(req.body.customer){
        CarFix.customer = req.body.customer;
      }
      if(req.body.price){
        CarFix.price = parseInt(req.body.price);
      }
      console.log(CarFix);
      CarFix.save((err, data) => {
        console.log(data);
        if(err){
          return res.json({success: false, msg: 'Update CarFix failed.'});
        }
          return res.json({success: true, msg: 'Successful Update ' + data});
      });

    });
  }


});

router.post('/service', function(req, res) {
  let token = req.cookies.Authorized;
  if (token !== null) {
    let newService = new Service({
      name: req.body.name,
      price: req.body.price,
      dostyp: req.body.dostyp
    });

    newService.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save Service failed.'});
      }
      res.json({success: true, msg: 'Successful created new Service.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/service', function(req, res) {
  let token = req.cookies;
  if (token !== null) {
    Service.find((err, Service) =>{
      if (err) return next(err);
      res.json(Service);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.delete('/service/delete/:id', function (req, res) {
  let mass = req.body.selected.split(',');
  let token = req.cookies.Authorized;
  if (token !== null) {
    Service.deleteMany({
      _id: mass
    }, function (err) {
      if (err) {
        return res.json({success: false, msg: 'Delete Service failed.'});
      } else {
        return res.json({success: true, msg: 'Successful Delete ' + req.params.id});
      }
    })
  }
});

router.patch('/service/upgrade', function (req, res) {
  let token = req.cookies.Authorized;
  if (token !== null){
    Service.findById(req.body._id, (err, Service) => {
      if(err){
        return res.json({success: false, msg: 'Not found.'});
      }
      if(req.body.name){
        Service.name = req.body.name;
      }
      if(req.body.price){
        Service.price = req.body.price;
      }
      if(req.body.dostyp){
        Service.dostyp = req.body.dostyp;
      }
      Service.save((err, data) => {
        if(err){
          return res.json({success: false, msg: 'Update Service failed.'});
        }
        return res.json({success: true, msg: 'Successful Update ' + data});
      });

    });
  }
});

router.get('/users', function(req, res) {
  let token = req.cookies;
  if (token !== null) {
    User.find((err, User) => {
      if (err) return next(err);
      res.json(User);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.delete('/users/delete/:id', function (req, res) {
  let mass = req.body.selected.split(',');
  let token = req.cookies.Authorized;
  if (token !== null) {
    User.deleteMany({
      _id: mass
    }, function (err) {
      if (err) {
        return res.json({success: false, msg: 'Delete User failed.'});
      } else {
        return res.json({success: true, msg: 'Successful Delete ' + req.params.id});
      }
    })
  }
});

router.patch('/users/upgrade', function (req, res) {
  let token = req.cookies.Authorized;
  if (token !== null){
    User.findById(req.body._id, (err, User) => {
      if(err){
        return res.json({success: false, msg: 'Not found.'});
      }
      if(req.body.username){
        User.username = req.body.username;
      }
      if(req.body.password){
        User.password = req.body.password;
      }
      if(req.body.last_name){
        User.last_name = req.body.last_name;
      }
      if(req.body.name){
        User.name = req.body.name;
      }
      if(req.body.middle_name){
        User.middle_name = req.body.middle_name;
      }
      if(req.body.position){
        User.position = req.body.position;
      }
      User.save((err, data) => {
        if(err){
          return res.json({success: false, msg: 'Update CarFix failed.'});
        }
        return res.json({success: true, msg: 'Successful Update ' + data});
      });

    });
  }
});


module.exports = router;
