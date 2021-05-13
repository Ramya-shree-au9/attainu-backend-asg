import mongoose from "mongoose";

const PostsSchema = mongoose.Schema({
        name:{
            type: String,
            required:true
        },
        title:{
            type: String,
            required:true
        },
        date: {
            type: Date,
            default: Date.now,
          }
    
    
});

const Users = mongoose.model("userposts",PostsSchema);

export default Users;
