const jwt = require("jsonwebtoken");
function isloggedin(req,res,next){
    if(req.cookies.token){
        let coupon = jwt.verify(req.cookies.token,process.env.secret);
        req.user= coupon;
        next();
    }
    else{
        res.redirect("/user/login");
    }
}
module.exports=isloggedin;