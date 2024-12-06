const express = require('express')
const app = express()
const host = process.env.DB_HOST
const port = 3000
app.use(express.static('public'))
const postRouter = require('./routers/post.js')
app.use(express.json())
const notFoundMiddleware = require('./middlewares/notFound.js')
const loggerMiddleware = require('./middlewares/logger.js')
const serverError = require('./middlewares/serverError.js')
const cors = require('cors');
app.use(cors())

app.listen(port, () => {
    console.log(`server is running at ${host}:${port} `);


})
/* app.use('/post', (req, res, next) => {
    throw new Error("You broke everything dude! 💥")
}) */


app.use("/posts", postRouter)

app.put('/:slug', postRouter)

app.delete('/:id', postRouter)

// MIDDLEWARES FOR ERROR HANDLING
/* app.use(loggerMiddleware)

app.use(notFoundMiddleware)

app.use(serverError)

 */




