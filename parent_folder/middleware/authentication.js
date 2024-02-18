const jwt = require("jsonwebtoken")

const tokenValidation = async (req, res, next) => {
    try {
        let token;
        const authHeader = req.headers.authorization || req.headers.authorization
        token = authHeader.split(" ")[1]
    
        if (authHeader && authHeader.startsWith("Bearer")) {
            const verification = jwt.verify(token, process.env.SECRET, (err, decode) => {
                if (err) {
                    return res.status(401).json("not authorized")
                }
                console.log(decode)
                req.user = decode.payload
                next()
            })
        }
        else {
            return res.json("proide valid token")
        }
    }
    catch (err) {
        console.log(err)
    }
}

module.exports=tokenValidation