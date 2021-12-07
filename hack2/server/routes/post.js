import express from 'express'
import Post from '../models/post'
import moment from 'moment'

const router = express.Router()

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get('/allPosts', async (_, res) => {
    // console.log('be allPosts called');
    const target = await Post.find().sort({timestamp: -1})
    if(target){
        let posts = []
        target.map((t) => {
            posts.push({
                postId: t.postId,
                title: t.title,
                content: t.content,
                timestamp: t.timestamp
            })
        })
        // console.log('posts', posts);
        res.status(200).send({"message": 'success', "data": posts});
    }else{
        res.status(403).send({"message": 'error', "data": null});
    }
})


// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get('/postDetail', async (req, res) => {
    const finding = req.query.pid
    // console.log('be postDetail called', finding);
    const target = await Post.findOne({postId: finding})
    if(target){
        let post = {
            postId: target.postId,
            title: target.title,
            content: target.content,
            timestamp: target.timestamp
        }
        res.status(200).send({"message": 'success', "post": post});
    }else{
        res.status(403).send({"message": 'error', "post": null});
    }
})


// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('/newPost', async (req, res) => {
    console.log('be newPost called body:', req.body);
    const {postId, title, content, timestamp} = req.body
    try{
        const newPost = new Post({postId, title, content, timestamp});
        await newPost.save();
        if(newPost){
            res.status(200).send({"message": "success"});
        }else{
            res.status(403).send({"message": "error", "post": null});
        }
    }catch(e){res.status(403).send({"message": 'error', "post": null});}
})


// TODO 5-(1): create the 4th API (/api/post)
router.delete('/post', async (req, res) => {
    const finding = req.query.pid
    console.log('be delete post called', finding);
    try{
        const target = await Post.deleteOne({postId: finding})
        if(target){
            res.status(200).send({"message": "success"});
        }else{
            res.status(403).send({"message": "error", "post": null});
        }
    }catch(e){res.status(403).send({"message": 'error', "post": null});}
})


export default router