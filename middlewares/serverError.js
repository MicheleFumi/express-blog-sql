const serverError = ((err, req, res, next) => {
    throw new Error("You broke everything dude! 💥")
    console.log(err.message);

    console.error(err.stack);
    res.status(500).send({
        messge: "something went wrong",
        error: err.message
    })

})

module.exports = serverError