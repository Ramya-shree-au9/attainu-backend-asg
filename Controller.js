import Users from "./Models/usermodel.js";
import Posts from './Models/posts.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "./config.js";

export const register = async (req, res) => {
  const { name, email, password, role} = req.body;
  var hashpassword = bcrypt.hashSync(password, 8);
  Users.findOne({ email:email }, async (err, data) => {
    try {
      if (data) {
        res
          .status(200)
          .send({ message: "Mail already taken,try another one" });
      } else {
        Users.create(
          {
            name: name,
            email: email,
            password: hashpassword,
            role: role ? role : "user",
          },
          (err, user) => {
            try {
              res
                .status(200)
                .send({ data: user, message: "Registered Successfully" });
            } catch (err) {
              console.log(err);
              res.status(404);
            }
          }
        );
      }
    } catch (err) {
      console.log(err);
      res.status(404).send();
    }
  });
};


export const login = async (req, res) => {
  Users.findOne({ email: req.body.email }, (err, data) => {
    try {
      if (!data) {
        res.status(200).send({ message: "Email is not registered" });
      } else if (!bcrypt.compareSync(req.body.password, data.password)) {
        res
          .status(200)
          .send({ messagep: "Incorrect Password" });
      } else {
          
        var token = jwt.sign({id: data._id }, config.secrete, {
          expiresIn: 3600,
        });
        res.status(200).send({
          auth: true,
          token: token,
          data: data,
          message: "Login Successfully",
        });
      }
    } catch {
      res.status(404);
    }
  });
}; 

// If person randomly login with any username and password
export const loginradomuser = async (req, res) => {
    console.log(req.body.name,req.body.password)
    var hashpassword = bcrypt.hashSync(req.body.password, 8);
        Users.create(
            {
              name: req.body.name,
              password: hashpassword,
            },
            (err, user) => {
        try {
          var token = jwt.sign({id: user._id }, config.secrete, {
            expiresIn: 3600,
          });
          res.status(200).send({
            token: token,            
            message: "Login Successfully",
          });
        }
        catch {
            res.status(404);
          }

      })
    
  }; 
  

// Pagination
export const allPostspaginate = async(req,res)=>{  
    try{
    const result = await Posts.find()
    var page = parseInt(req.query.page) || parseInt(1);
    var limit = parseInt(req.query.limit) || parseInt(2) ;

    var startIndex = (page-1) * limit
    var endIndex = page * limit
    var results = {}

    results = result.slice(startIndex,endIndex)
    res.status(200).send(results)
    
    }catch {
        res.status(404);
    }
}

export const createPosts = async(req,res)=>{  
     if(req.body.role === 'admin' && req.body.title.length < 255){
         console.log('admin')
        Posts.create({
            name:req.body.name,
            title:req.body.title
        },
          (err, posts) => {
            try {
              res
                .status(200)
                .send(posts);
            } catch (err) {
              res.status(404);
            }
          }
        );
      
  }else{
    res.status(404);
  }
}

export const updatePosts = async(req,res)=>{  
     if(req.body.role === 'admin'){
        try {
            Posts.findByIdAndUpdate(req.params.id,
            {title:req.body.title},{new: true},
            (err,data)=>{
                res.status(200).send({ data: data, message: "Update Successfully" }) 
          })
        }
           catch {
            res.status(404).send(err)
          }
      
  }else{
    res.status(404);
  }
}

export const deletePosts = async(req,res)=>{  
     if(req.body.role === 'admin'){
        try {
            Posts.findByIdAndDelete(req.params.id,
               (err,result)=>{
                res.status(200).send({ message: "Delete Successfully" }) 
          })
        }
           catch {
            res.status(404).send(err)
          }
      
  }else{
    res.status(404);
  }
}

