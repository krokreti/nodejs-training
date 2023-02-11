exports.getPosts = (req, res, next) => {
    res.status(200).json(
        {
            posts: [
                {
                    _id: '1',
                    title: "hamburguer",
                    content: "thats a good hamburguer",
                    imageUrl: 'images/yusuke.jpg',
                    creator: {
                        name: 'Davi'
                    },
                    createdAt: new Date()
                }
            ]
        }
    )
}

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    console.log(`Creating post... title: ${title}`)
    //create data in db

    res.status(201).json({
        message: "Post created successfully!",
        post: {
            _id: new Date().toISOString(),
            title: title,
            content: content,
            creator: {
                name: 'Davi'
            },
            createdAt: new Date()
        }
    })
}