import jwt from "jsonwebtoken";
import config from "./config.js";

export const validate = async(req,res,next)=>{  
    var token = req.headers["x-access-token"];

    if (!token || token === "null") {
        console.log('err')
      res.send({ auth: false, message: "Invalid Token" });
    } else {
      jwt.verify(token, config.secrete, (err, data) => {
        if (err) {
          res.status(200).send({ auth: false, message: "Token expired" });
        }
            console.log('result')
            next()
    })
    }
}