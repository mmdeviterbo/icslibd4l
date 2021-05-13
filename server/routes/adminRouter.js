//user file from the models directory
const user = require('../models/adminModel');
const router = require("express").Router();

router.get('/retrieve', async (req, res) => {
    user.find({ firstName: "Ryan"}, (err, result) => {
        if(err){
            res.send(err);
        }

        res.send(result);
    });
});

router.post('/add', async (req, res) => {
    const { upMail, firstName, lastName, userType } = req.body.newIcsUser;

    try{
        await newIcsUser.save();
        res.send('User Added.')
    } catch(err) {
        console.log(err)
    }
});

module.exports = router;