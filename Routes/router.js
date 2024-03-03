// path to resolve the client request

// 1) import express
const express = require('express')

// import controller
const userController = require('../controllers/userController')

//import project controller
const projectController = require('../controllers/projectController')

//import jwt middleware 
const jwtMiddleware =require('../MiddleWare/jwtmiddleware')

//import mullter
const multerConfig = require('../MiddleWare/multerMiddleware')

// 2) create an object for the class Router in express
const router =  new express.Router()

// 3) path for resolving the request    
    // syntax - router.httprequest('path to reslove request ',()=>{how to resolve the request(inside controller)})
    // a) Register
        router.post('/user/register',userController.register)

     // b) login
     router.post('/user/login',userController.login)

     //c)add project
     router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)


     //get home projects
     router.get('/project/home-project',projectController.getHomeProjects)

       //get all projects
       router.get('/project/all-project',jwtMiddleware,projectController.getAllProjects)

         //get user projects
     router.get('/project/user-project',jwtMiddleware,projectController.getUserProjects)

  //edit projects
  router.put('/project/edit/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editUserProject)

  //delete project
  router.delete('/project/remove/:id',jwtMiddleware,projectController.deleteUserProject)

  //edit Profile
  router.put('/user/edit',jwtMiddleware,multerConfig.single('profile'),userController.editUser)

// 4) export router
module.exports = router