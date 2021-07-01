const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const front = require("../controllers/controller_frontend");

router.post("/", async (req, res) => {
    console.log(req)
    console.log('req.body')
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = new User(req.body);

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        const token = user.generateAuthToken();
        console.log(token)
        //res.send(user);
        //res.render('pages/home.html')
        //router.get('/', front.home)
        //res.redirect('/')
        res.json({'token': token})
    } catch (error) {
        console.log(error);
        console.log('error')
        res.send("An error occured");
    }
});

router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password -__v");
        res.json(user);
    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }
});

module.exports = router;
