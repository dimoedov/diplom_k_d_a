let mongoose = require('mongoose');
let config = require('../config/database');
let express = require('express');
let jwt = require('jsonwebtoken');
let router = express.Router();
let User = require("../models/user");
let Service = require("../models/service");
let Object = require("../models/object");
let client = require("../models/client");
let Fix = require("../models/fix");
const next = require('jade');

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
  let token = req.cookies.Authorized;
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
  let token = req.cookies.Authorized;
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
          return res.json({success: false, msg: 'Update users failed.'});
        }
        return res.json({success: true, msg: 'Successful Update ' + data});
      });

    });
  }
});

router.post('/clients', function(req, res) {
  let token = req.cookies.Authorized;
  if (token !== null) {
    let newClient = new client({
      name: req.body.name,
      type: req.body.type,
      contacts: req.body.contacts
    });

    newClient.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save client failed.'});
      }
      res.json({success: true, msg: 'Successful created new client.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/clients', function(req, res) {
  let token = req.cookies.Authorized;
  if (token !== null) {
    client.find((err, client) =>{
      if (err) return next(err);
      res.json(client);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.delete('/clients/delete/:id', function (req, res) {
  let mass = req.body.selected.split(',');
  let token = req.cookies.Authorized;
  if (token !== null) {
    client.deleteMany({
      _id: mass
    }, function (err) {
      if (err) {
        return res.json({success: false, msg: 'Delete client failed.'});
      } else {
        return res.json({success: true, msg: 'Successful Delete ' + req.params.id});
      }
    })
  }
});

router.patch('/clients/upgrade', function (req, res) {
  let token = req.cookies.Authorized;
  if (token !== null){
    client.findById(req.body._id, (err, client) => {
      if(err){
        return res.json({success: false, msg: 'Not found.'});
      }
      if(req.body.name){
        client.name = req.body.name;
      }
      if(req.body.type){
        client.type = req.body.type;
      }
      if(req.body.contacts){
        client.contacts = req.body.contacts;
      }
      client.save((err, data) => {
        if(err){
          return res.json({success: false, msg: 'Update clients failed.'});
        }
        return res.json({success: true, msg: 'Successful Update ' + data});
      });

    });
  }
});

router.post('/objects', function(req, res) {
  let token = req.cookies.Authorized;
  if (token !== null) {
    let newObject = new Object({
      name: req.body.name,
      date_start: req.body.date_start,
      company: req.body.company,
      project: req.body.project,
      calls_obj: req.body.calls_obj,
      etc: req.body.etc
    });

    newObject.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save objects failed.'});
      }
      res.json({success: true, msg: 'Successful created new client.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/objects', function(req, res) {
  let token = req.cookies.Authorized;
  if (token !== null) {
    Object.find((err, objects) =>{
      if (err) return next(err);
      res.json(objects);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.delete('/objects/delete/:id', function (req, res) {
  let mass = req.body.selected.split(',');
  let token = req.cookies.Authorized;
  if (token !== null) {
    Object.deleteMany({
      _id: mass
    }, function (err) {
      if (err) {
        return res.json({success: false, msg: 'Delete Object failed.'});
      } else {
        return res.json({success: true, msg: 'Successful Delete ' + req.params.id});
      }
    })
  }
});

router.patch('/objects/upgrade', function (req, res) {
  let token = req.cookies.Authorized;
  if (token !== null){
    Object.findById(req.body._id, (err, Object) => {
      if(err){
        return res.json({success: false, msg: 'Not found.'});
      }
      if(req.body.date_start){
        Object.date_start = req.body.date_start;
      }
      if(req.body.name){
        Object.name = req.body.name;
      }
      if(req.body.company){
        Object.company = req.body.company;
      }
      if(req.body.project){
        Object.project = req.body.project;
      }
      if(req.body.calls_obj){
        Object.calls_obj = req.body.calls_obj;
      }
      if(req.body.etc){
        Object.etc = req.body.etc;
      }
      Object.save((err, data) => {
        if(err){
          return res.json({success: false, msg: 'Update Object failed.'});
        }
        return res.json({success: true, msg: 'Successful Update ' + data});
      });

    });
  }
});


router.post('/fix', function(req, res) {
  let token = req.cookies.Authorized;
  if (token !== null) {
    let newFix = new Fix({
      master: req.cookies.id,
      service: req.body.service,
      object: req.body.object,
      client: req.body.client,
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      price: req.body.price,
      status: req.body.status,
      etc: req.body.etc
    });
    newFix.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save Service failed.'});
      }
      res.json({success: true, msg: 'Successful created new Service.',_id:  newFix._id});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/fix', function(req, res) {
  let token = req.cookies.Authorized;
  let mass = [];
  if (token !== null) {
    Fix.find({
    master: req.cookies.id
    },function (err, obj){
      mass = obj;
      for (let prop in mass){
        Object.findById({
          _id: mass[prop]['object']
        },{
          name: true,
          _id: false
        }, function (err, objects) {
          mass[prop]['object'] = objects['name'];
          User.findById({
            _id: mass[prop]['master']
          },{
            last_name: true,
            name: true,
            middle_name: true,
            _id: false
          }, function (err, users) {
            mass[prop]['master'] = users['last_name']+' '+users['name']+' '+users['middle_name'];
            client.findById({
              _id: mass[prop]['client']
            },{
              name: true,
              _id: false
            }, function (err, clients) {
              mass[prop].client = clients.name;
              Service.find({
                _id: mass[prop]['service'].split(',')
              },{
                name: true,
                _id: false
              }, function (err, Service) {
                let buffer = [];
                for (let param in Service){
                  buffer.push(Service[param]['name']);
                }
                mass[prop].service = buffer.join("\n");

              })
            })
          })
        }).catch(err => res.json(err));

      }

    }).then(db => setTimeout(dt =>  res.json(mass),100));

  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/fix/all', function(req, res) {
  let token = req.cookies.Authorized;
  let mass = [];
  if (token !== null) {
    Fix.find({

    },function (err, obj){
      mass = obj;

      for (let prop in mass){
        Object.findById({
          _id: mass[prop]['object']
        },{
          name: true,
          _id: false
        }, function (err, objects) {
          mass[prop]['object'] = objects['name'];
          User.findById({
            _id: mass[prop]['master']
          },{
            last_name: true,
            name: true,
            middle_name: true,
            _id: false
          }, function (err, users) {
            mass[prop]['master'] = users['last_name']+' '+users['name']+' '+users['middle_name'];
            client.findById({
              _id: mass[prop]['client']
            },{
              name: true,
              _id: false
            }, function (err, clients) {
              mass[prop].client = clients.name;
              Service.find({
                _id: mass[prop]['service'].split(',')
              },{
                name: true,
                _id: false
              }, function (err, Service) {
                let buffer = [];
                for (let param in Service){
                  buffer.push(Service[param]['name']);
                }
                mass[prop].service = buffer.join("\n");
              })
            })
          })
        })
            .catch(err => res.json(err))
      }
    }).then(db => setTimeout(dt =>  res.json(mass),100));
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.delete('/fix/delete/:id', function (req, res) {
  let mass = req.body.selected.split(',');
  let token = req.cookies.Authorized;
  if (token !== null) {
    Fix.deleteMany({
      _id: mass
    }, function (err) {
      if (err) {
        return res.json({success: false, msg: 'Delete Fix failed.'});
      } else {
        return res.json({success: true, msg: 'Successful Delete ' + req.params.id});
      }
    })
  }
});

router.patch('/fix/upgrade', function (req, res) {
  let token = req.cookies.Authorized;
  if (token !== null){
    Fix.findById(req.body._id, (err, Fix) => {
      if(err){
        return res.json({success: false, msg: 'Not found.'});
      }
      if(req.body.master){
        Fix.master = req.body.master;
      }
      if(req.body.service){
        Fix.service = req.body.service;
      }
      if(req.body.object){
        Fix.object = req.body.object;
      }
      if(req.body.client){
        Fix.client = req.body.client;
      }
      if(req.body.dateStart){
        Fix.dateStart = req.body.dateStart;
      }
      if(req.body.dateEnd){
        Fix.dateEnd = req.body.dateEnd;
      }
      if(req.body.price){
        Fix.price = req.body.price;
      }
      if(req.body.status){
        Fix.status = req.body.status;
      }
      if(req.body.etc){
        Fix.etc = req.body.etc;
      }
      Fix.save((err, data) => {
        if(err){
          return res.json({success: false, msg: 'Update Fix failed.'});
        }
        return res.json({success: true, msg: 'Successful Update ' + data});
      });

    });
  }
});

//получение списков для селектов
router.get('/objects/list', function(req, res) {
  let token = req.cookies;
  let list = [];
  if (token !== null) {
    Object.find({},{name: true, _id: false}, function (err, objects){
      if (err) return next(err);
      for(let prop in objects){
        list.push({value: objects[prop].name, label: objects[prop].name})
      }
      res.json(list);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/clients/list', function(req, res) {
  let token = req.cookies;
  let list = [];
  if (token !== null) {
    client.find({},{
      name: true,
      _id: false
    }, function (err, client){
      if (err) return next(err);
      for(let prop in client){
        list.push({value: client[prop].name, label: client[prop].name})
      }
      res.json(list);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/service/list', function(req, res) {
  let token = req.cookies;
  let list = [];
  if (token !== null) {
    Service.find({
      dostyp: true
    },{
      name: true,
      _id: false
    }, function (err, Service){
      if (err) return next(err);
      for(let prop in Service){
        list.push({value: Service[prop].name, label: Service[prop].name})
      }
      res.json(list);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

// получение _id
router.post('/objects/list', function(req, res) {
  let token = req.cookies;
  let list = [];
  if (token !== null) {
    Object.find({
      name: req.body.name
    },{
      _id: true
    }, function (err, objects){
      if (err) return next(err);
      for(let prop in objects){
        list.push(objects[prop]._id)
      }
      res.json(list);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.post('/clients/list', function(req, res) {
  let token = req.cookies;
  let list = [];
  if (token !== null) {
    client.find({
      name: req.body.name
    },{
      _id: true
    }, function (err, client){
      if (err) return next(err);
      for(let prop in client){
        list.push(client[prop]._id)
      }
      res.json(list);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.post('/service/list', function(req, res) {
  let token = req.cookies;
  let list = [];
  if (token !== null) {
    Service.find({
      name: req.body.name
    },{
      _id: true
    }, function (err, Service){
      if (err) return next(err);
      for(let prop in Service){
        list.push(Service[prop]._id)
      }
      res.json(list);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
// получение общей цены
router.post('/fix/price', function(req, res) {
  let token = req.cookies;
  let list = 0;
  if (token !== null) {
    Service.find({
      _id: req.body._id
    },{
      price: true,
      _id: false
    }, function (err, Service){
      if (err) return next(err);
      for(let prop in Service){
        list +=(Service[prop].price)
      }
      res.json(list);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

//получение услуг для чека и их цены
router.post('/check', function(req, res) {
  let token = req.cookies;
  if (token !== null) {
    Fix.find({
    _id: req.body.id_new_fix
    },function (err, obj){
      if (err) return next(err);
      Service.find({
        _id: obj[0].service.split(',')
      },function (err, service) {
        if (err) return next(err);
        res.json(service);
      })
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
//получение названия и цены по ид
router.post('/check/price', function(req, res) {
  let token = req.cookies;
  if (token !== null) {
    Service.find({
      _id: req.body._id
    }, function (err, Service){
      if (err) return next(err);
      res.json(Service);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
//получение заказчика и объекта по ид
router.post('/check', function(req, res) {
  let token = req.cookies;
  if (token !== null) {
    Service.find({
      _id: req.body._id
    }, function (err, Service){
      if (err) return next(err);
      res.json(Service);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

module.exports = router;
