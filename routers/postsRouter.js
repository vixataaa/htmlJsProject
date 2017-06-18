var express = require('express');

module.exports = function(db) {
    var router = express.Router();

    // Get all
    router.get('/', function(req, res) {
        const posts = db.get('posts')
            .value();

        res.json({
            posts : posts
        });
    });

    // Get one
    router.get('/:postId', function(req, res) {
        const postId = req.params.postId;

        const foundPost = db.get('posts')
            .find({
                id : postId
            })
            .value();

        if(!foundPost) {
            res.status(404)
                .json('Post not found.');
            return;
        }

        res.json(foundPost);
    });

    // Add new
    router.post('/', function(req, res) {
        const postToAdd = req.body;

        const allPosts = db.get('posts');

        const titleLower = postToAdd.title.toLowerCase();

        const foundPost = allPosts.find({
            titleLower : titleLower
        }).value();

        if(foundPost) {
            res.status(401)
                .json('Post with that title already exists.');
            return;
        }

        postToAdd.titleLower = postToAdd.title.toLowerCase();

        allPosts.insert(postToAdd)
            .write();

        res.json('Post added.');
    });

    // Add comment
    router.post('/:postId', function(req, res) {
        const postId = req.params.postId;

        const foundPost = db.get('posts')
            .find({
                id : postId
            });

        if(!foundPost.value()) {
            res.status(404)
                .json('Post not found');
            return;
        }

        const replies = foundPost.value().replies;

        replies.push(req.body);

        foundPost.assign({
           replies : replies 
        })
        .write();

        console.log(replies);

        res.json('Comment added.');
    });

    return router;
};