const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const heading =  req.header('Authorization')
        console.log(heading)
        const token = heading.split(' ')[1];
        console.log(token)
        if (!token) return res.status(403).send("Access denied.");

        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded;
        console.log(req.user)
        next();
    } catch (error) {
        console.log(heading)
        res.status(400).send("Invalid token" + heading);
    }
};
