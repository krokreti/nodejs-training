const { validationResult } = require('express-validator')

const Post = require('../models/post')

exports.getPosts = (req, res, next) => {
    Post.find({}).then(result => {
        res.status(200).json({
            posts: result
        });
    })
    // res.status(200).json(
    //     {
    //         posts: [
    //             {
    //                 _id: '1',
    //                 title: "hamburguer",
    //                 content: "thats a good hamburguer",
    //                 imageUrl: 'images/yusuke.jpg',
    //                 creator: {
    //                     name: 'Davi'
    //                 },
    //                 createdAt: new Date()
    //             }
    //         ]
    //     }
    // )
}

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.')
        error.statusCode = 422;
        error.array = errors.array();
        throw error;
        // return res.status(422).json({
        //     message: 'Validation failed, entered data is incorrect.',
        //     errors: errors.array()
        // });
    }
    const title = req.body.title;
    const content = req.body.content;
    console.log(`Creating post... title: ${title}`)
    //create data in db
    const post = new Post({
        title: title,
        content: content,
        imageUrl: 'images/yusuke.jpg',
        creator: {
            name: 'Davi'
        },
    });

    post
        .save()
        .then(result => {
            res.status(201).json({
                message: "Post created successfully!",
                post: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}