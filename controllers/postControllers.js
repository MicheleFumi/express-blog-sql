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
    const id = req.params.id
    const sql = 'SELECT * FROM posts WHERE id = ?';
    const tagSql = `
    SELECT *
    FROM tags
    JOIN post_tag  ON tags.id = post_tag.tag_id
    WHERE post_tag.post_id = ?
    `;

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err })
        if (!results[0]) return res.status(404).json({ error: 'Post not found' })

        const post = results[0]
        connection.query(tagSql, [id], (err, tagResults) => {
            if (err) return res.status(500).json({ error: err })
            console.log(tagResults);

            const tagLabels = tagResults.map(tag => tag.label)

            post.tags = tagLabels

            const responseData = {
                data: post,
            }
            console.log(responseData);
            res.status(200).json(responseData)

        })


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
    const { id } = req.params

    connection.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete post' });
        res.sendStatus(204)
    });

}




module.exports = {
    index,
    show,
    store,
    update,
    destroy

}