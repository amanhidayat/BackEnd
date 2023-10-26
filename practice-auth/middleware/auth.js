const jwt = require('jsonwebtoken')

module.exports = {
    verifyToken: (req, res, next) => {
        try {
            let token = req.headers.authorization
            if (!token) {
                return res.status(401).send({
                    message: 'Token empty'
                })
            }
            token = token.split(' ')[1]

            let verfiedUse = jwt.verify(token, 'JCWD0208')

            console.log(token);
            console.log(verfiedUse);

            req.user = verfiedUse
          

            next()
        } catch (err) {
            console.log(err);
            res.status(400).send({err})
        }
    },
    checkRole: (req, res, next) => {
        if (req.user.isAdmin) {
          return next()
        }
       return res.status(400).send({
           message: 'Unauthorized (admin only) !!'
        })
       }
}
