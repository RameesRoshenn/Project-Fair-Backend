// import model
const users = require('../Models/userSchema')

// import jwt
const jwt  = require('jsonwebtoken')

// logic for register
exports.register = async(req,res)=>{
    // logic
    console.log('inside usercontroller-register logic');
    // destructuring data from the client request body(since json format is converted into javaascript object by the .json() method usedin index.js file)
    const {username,email,password} = req.body

        try{
        // since email is the unique value we are checking that email is already parent in the database 
        // for that we are using findOne method which return entire document the condition is true else return null
        const existingUser = await users.findOne({email})

        if (existingUser) {
            // if findOne return document it means that the user already exists 
            // so we are sending a response in the 400 series( client request error ) 
            res.status(406).json('Account already Exists...Please Login')
        }
        else{
            // if findOne returns null ,it mean the email or the user doesnot exist in the database 
            // we register the user
                // 1)create object for the email 
                const newUser = new users({
                    username,
                    email,
                    password,
                    github:"",
                    linkedin:"",
                    profile:""
                })
                
                // 2) inorder to add the above object use save() method in mongoose
                await newUser.save() /* we give await because it is the connection b/w server and mongodb */

            // response
            res.status(200).json(newUser)
        }

    }
    // javascript resolve runtime errors using try-catch block so the content has chance to get have error should put inside try
    catch(err){
        res.status(401).json('Register Request Failed due to ',err)
    }

    
}


// logic for login

exports.login = async(req, res)=>{
    console.log('inside login function');
    
    const {email,password} = req.body

    try{
        const existingUser = await users.findOne({email,password})

        if (existingUser) {
            // sign is the function used to create token
            // first arg - payload - the information that is secretly transmitted
            // second arg - secret key - based on which the token is generated
            
            const token = jwt.sign({userId : existingUser._id},"superkey1010")
            res.status(200).json({
                existingUser,
                token
            })
        }
        else{
            res.status(404).json('Invalid Email Id or Password')
        }
    }
    catch(err){
        res.status(401).json('Login failed due to : ',err)
    }
}

//edit profile
exports.editUser = async (req,res) =>{
    const userId =req.payload
    const {username,email,password,github,linkedin,profile}=req.body
    const profileImage = req.file?req.file.filename:profile
    try{ 
        const updateUser =await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profile:profileImage},{new:true})

        await updateUser.save()
        res.status(200).json(updateUser)

    }
    catch{
        res.status(401).json(err)   
    }
}