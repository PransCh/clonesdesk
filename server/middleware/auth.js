import jwt from 'jsonwebtoken'

export const verifyToken = async(req,res,next)=>{//to make function continue
    try{
    let token = req.header("Authorization")//from frontend we are taking files from header and grab to back end
    if(!token) {
        return res.status(403).send("Access Denied");
    }
    if(token.startsWith("Bearer ")){
    token = token .slice(7,token.length).trimLeft();
    }//we take everything from bearer starting with 7 th index spaces also included

    const verified = jwt.verify(token,process.env.JWT_SECRET);
    req.user = verified;
    next();
    }catch(err){
    res.status(500).json({ error: err.message });
    }
}