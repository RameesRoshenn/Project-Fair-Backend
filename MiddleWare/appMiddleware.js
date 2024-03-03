
 const appMiddleware =(req,res,next)=>{
console.log('inside application middleware');
next()
}

module.exports = appMiddleware