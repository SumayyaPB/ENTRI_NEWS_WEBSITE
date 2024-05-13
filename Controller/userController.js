
 import User from '../Model/userModel.js';
 import bcrypt from 'bcrypt'
 import jwt from 'jsonwebtoken'
 import 'dotenv/config';
 

 const addUser = async(req,res)=>{
    try{
        const saltRounds = 10;
        bcrypt.hash(req.body.password,saltRounds,async(err, hash)=>{
            if(err){
                console.log('Error occurred while hashing:', err);
                res.status(500).json({error:'Internal server error'}) 

            }
            var userItem = {
                name : req.body.name,
                email : req.body.email,
                username : req.body.username,
                password  : hash,
                createdAt : new Date()
        
        }
        var user = new User(userItem)
        await user.save()
        res.status(201).send(user) 
            
        });
        
    

    }catch(error){
      console.log(error);
      res.status(500).json({error:'Internal server error'}) 
    }
}
    

const getUsers = async(req,res)=>{
    try {
       const users= await User.find({});
       if(!users){
        res.status(404).json({error:'Users not found'})
       }
       res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'}) 
    }
}

const getUserByUserName = async(req,res)=>{
    try {
       const user= await User.findOne({username:req.params.username}).exec();
       if(!user){
        res.status(404).json({error:'Users not found'})
       }
       res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'}) 
    }
}
const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const userData = await User.findOne({email:email});
        if(!userData){
            res.status(500).json({message:'user not found'})
        }
        const isValid =await bcrypt.compare(password,userData.password)
        if(!isValid){
            res.status(500).json({message:'invalid credentials'})
        }
        let payload = {user:email,pwd:password};
        const secret_key = process.env.JWT_SECRET_KEY;
        let token = jwt.sign(payload,secret_key);

        res.status(200).json({message:'login successful',token:token})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
}

const updateUserById = async(req,res)=>{
    try {
       const user= await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).exec();
       if(!user){
        res.status(404).json({error:'Users not found'})
       }
       res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'}) 
    }
}

const deleteUser = async(req,res)=>{
    try {
       const user= await User.findByIdAndDelete(req.params.id).exec();
       if(!user){
        res.status(404).json({error:'Users not found'})
       }
       res.status(200).json({message:"successfully deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'}) 
    }
}


 
 export {getUsers,getUserByUserName,addUser,login,updateUserById,deleteUser } 

//  const doLogin = async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       const userData = await USERS.findOne({ email:email });
//       if (userData) {
//         bcrypt.compare(password,userData.password,(err,result)=>{
//            if (result) {
//               userData.password = undefined
//               const options = {
//                  expiresIn:'2d',
//                  algorithm:'HS256'
//               }
//               const token =jwt.sign({...userData},process.env.JWT_PASSWORD,options)
//               res.status(200).json({user:userData,token})
//            } else {
//               res.status(401).json({message:'Invalid credential'})
//            }
//         }) 
//       }else{
//         res.status(401).json({message:'Invalid credential'})
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   };
  
  
  
//   module.exports = {doSignup,doLogin}
  