// require JWT
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const auth = req.headers?.authorization || null
    const accessToken = auth ? auth.split(' ')[1] : null // get rid of the Bearer keyword

    // verify the token:
    if (accessToken) {
        jwt.verify(accessToken, process.env.ACCESS_KEY, (err, tokenData) => {
            req.user = tokenData || 'not authenticated'
            // add createdID for req.body:
            req.body.createdId = req.user?._id

            if(tokenData) console.log("USER AUTHENTICATED WITH JWT!")
            console.log(req.user)
        })

    } else {
        req.user = 'not authenticated'
        console.log(`user = ${req.user}`)
    }

    next()
}