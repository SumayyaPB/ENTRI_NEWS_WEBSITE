import express from 'express';
import { addPost, getPost, updatePost, deletePost, getImgById } from '../Controller/postController.js';
import { upload } from '../Upload.js';
import passport from '../passport.js'

const postRouter = express.Router();

postRouter.post('/', passport.authenticate('jwt', { session: false }), upload.single('image'), addPost);
postRouter.get('/', getPost);
postRouter.patch('/:id', updatePost);
postRouter.delete('/:id', deletePost);
postRouter.get('/image/:id', getImgById);

export default postRouter;
