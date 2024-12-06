const express = require('express')
const app = express()
const host = process.env.HOST
const port = process.env.PORT
app.use(express.static('public'))
const postRouter = require('./routers/post.js')
app.use(express.json())
const notFoundMiddleware = require('./middlewares/notFound.js')
const loggerMiddleware = require('./middlewares/logger.js')
const serverError = require('./middlewares/serverError.js')
const cors = require('cors');

app.use(cors())

app.listen(3000, (req, res) => {
    console.log(`server is running at ${host}:${port} `);


})
/* app.use('/post', (req, res, next) => {
    throw new Error("You broke everything dude! 💥")
}) */


app.use("/post", postRouter)

app.use("/index", postRouter)

app.use("/", postRouter)

app.put('/:slug', postRouter)

app.delete('/:index', postRouter)

// MIDDLEWARES FOR ERROR HANDLING
/* app.use(loggerMiddleware)

app.use(notFoundMiddleware)

app.use(serverError)

 */




