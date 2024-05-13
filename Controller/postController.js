
import Post from '../Model/postModel.js'
import fs from 'fs'
import path from 'path'

const addPost = async(req,res)=>{
    try {
        var postItem = {
            image: req.file.filename,
            title : req.body.title,
            subTitle : req.body.subtitle,
            desc : req.body.desc
        }
        var post = new Post(postItem)
        await post.save();
        post.imgURL =`http://localhost:3000/uploads/${post.id}`;
        
        res.status(201).json(postItem)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server Error'})
    }
}

const getPost = async(req,res)=>{
    try {
        const posts = await Post.find({});
    res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'internal server Error'})
    }
}

const updatePost = async (req,res)=>{
    try {
        const posts = await Post.findByIdAndUpdate(req.params.id,req.body ,{new:true }).exec()
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'internal server Error'}) 
    }
}

const deletePost = async (req,res)=>{
    try {
        await Post.findByIdAndDelete(req.params.id).exec()
        res.status(200).json({message:'Successfully Deleted'})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'internal server error'})
    }
}
const getImgById = async(req,res)=>{
    try {
        const id = req.params.id;
        const posts = await Post.findById(id).exec()
        if(!posts){
            res.status(404).json({error:'image not found'})
        }
        const dirname = path.resolve();
        const imgPath = path.join(dirname ,'uploads',posts.image)
        if(!fs.existsSync(imgPath)){
            return res.status(404).json({error:'image file is not found'})
        }
        res.sendFile(imgPath)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'internal server error'})
    }
}

export  {addPost,getPost,updatePost,deletePost ,getImgById}