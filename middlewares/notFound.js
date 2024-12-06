const notFoundMiddleware = (req, res, next) =>{
    res.status(404).send('Critical error: request not found!')
}



module.exports = notFoundMiddleware