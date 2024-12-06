const post = require('../db/db.js')
const fs = require('fs')
const connection = require('../db/db_connection.js');

// add index function for get all post
function index(req, res) {



    const sql = 'SELECT * FROM posts';

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err })

        const responseData = {
            data: results,
            counter: results.length
        }
        res.status(200).json(responseData)

    })
}
// add show function for get single post
const show = (req, res) => {
    const id = Number(req.params.id)



    const posts = post.find(post => post.id === id)


    if (!post) {
        return res.status(404).json({
            error: `404! Pizza Not Found!`
        })
    }
    return res.status(200).json({

        data: posts
    })

}

// add store function for create new post
const store = (req, res) => {
    const newPost = {
        id: req.body.id,
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }
    post.push(newPost)
    fs.writeFileSync('./db/db.js', `module.exports = ${JSON.stringify(post, null, 4)}`)

    return res.status(201).json({
        status: 201,
        data: post,
        count: post.length
    })


}
// add update function for update post
const update = (req, res) => {
    const id = req.params.id
    const sql = 'SELECT * FROM posts WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'post not found' });
        res.json(results[0]);
    });
}
// add delete function for delete post

const destroy = (req, res) => {
    const index = req.params.index
    const deletedPost = post.splice(index, 1);
    /*  if (!deletedPost) {
         return res.status(404).json({
             error: `Error! post was not found `
         })
     } */



    fs.writeFileSync('./db/db.js', `module.exports = ${JSON.stringify(post, null, 4)}`)
    return res.json({
        status: 200,
        data: post,
        count: deletedPost.length
    })

}




module.exports = {
    index,
    show,
    store,
    update,
    destroy

}