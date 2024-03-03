//import projectSchema
const projects =require('../Models/projectSchema')

//add project

exports.addProject =async( req , res)=>{

    console.log('inside add project request');
    const userId =req.payload
    console.log(userId);

    const projectImage =req.file.filename
    // console.log(projectImage);
    const{title ,language,github,website,overview}=req.body
    console.log(`${title} ,${language},${github},${website},${overview},${projectImage}`);
    
    
    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json('Project Already Exist .....Upload new Project')
        }
        else{
            const newProject =new projects({
                title,language,github,website,overview,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }

    } catch(err){
        res.status(401).json(`Request Failed due to ${err} `)
    }
    

 
}

//getHomeProject
exports.getHomeProjects =async(req , res)=>{
    try{
        const homeProjects =await projects.find().limit(3)
        res.status(200).json(homeProjects)

    }
    catch(err){
        res.status(401).json(`Request Failed due to ${err} `)
    }
}

//getAllProject

exports.getAllProjects =async(req , res)=>{
    const searchKey =req.query.search
    console.log(searchKey);

    const query ={
        language:{
            //regular expression ,option -to remove case sensitive property
            $regex:searchKey,$options:'i'
        }
    }
    try{
        const allProjects =await projects.find(query)
        res.status(200).json(allProjects)

    }
    catch(err){
        res.status(401).json(`Request Failed due to ${err} `)
    }
}

//getUserProject

exports.getUserProjects =async(req , res)=>{
    userId =req.payload
    try{
        const userProjects =await projects.find({userId})
        res.status(200).json(userProjects)

    }
    catch(err){
        res.status(401).json(`Request Failed due to ${err} `)
    }
}

// editprojects

exports.editUserProject =async (req,res)=>{
    const {id} =req.params
    const userId =req.payload
    const {title,language,github,website,overview,projectImage}=req.body
    const uploadProjectImage =req.file?req.file.filename:projectImage

    try{
        const updateProject =await projects.findByIdAndUpdate({_id:id},{title,language,github,website,overview,projectImage:uploadProjectImage,userId},{new:true})

        await updateProject.save()
        res.status(200).json(updateProject)

    }catch{
        res.status(401).json(err)
    }

}

//deletePRojects

exports.deleteUserProject = async (req,res)=>{
    const {id}=req.params

    try{
        const removeProject =await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)

    }catch(err){
        res.status(401).json(err)
    }
}