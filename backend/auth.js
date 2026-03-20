require("dotenv").config();
const jwt=require("jsonwebtoken");
function auth(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const response = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = response.id;
        next();
    } catch(err){
        res.status(403).json({
            msg:"Invalid token"
        })
    }
}
module.exports={
    auth
}
