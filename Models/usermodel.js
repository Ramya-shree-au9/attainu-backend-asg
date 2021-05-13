import mongoose from "mongoose";

const UsersSchema = mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required:true
  },
  role: {
    type: String,
  },
  
  
});

const Users = mongoose.model("usersdet", UsersSchema);

export default Users;
