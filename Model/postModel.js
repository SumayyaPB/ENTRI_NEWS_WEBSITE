import mongoose from 'mongoose'


const postSchema = new mongoose.Schema({
    image : String,
    title : String,
    subTitle : String,
    desc : String

    
})

const Post = mongoose.model('posts',postSchema);
export default Post