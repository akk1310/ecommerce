import jwt from "jsonwebtoken"

const authUser = async (req,res,next)=>{
    const {token} = req.headers;

    if(!token){
        return res.json({success:false,message:'Not authorized'})
    }
    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        // if (!req.body) {
        //     req.body = {};
        // }
        req.body.userId = decodedToken.id
        next()
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }

}

export default authUser