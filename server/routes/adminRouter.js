//user file from the models directory
const ics = require('../models/adminModel');
const router = require("express").Router();

router.get('/retrieve', async (req, res) => {
    ics.find({ adminName: "Ryan Resoles"}, (err, result) => {
        if(err){
            res.send(err);
        }

        res.send(result);
    });
});

router.post('/add', async (req, res) => {
    // encryption of password
    // let iv = crypto.randomBytes(16);
    // let key = crypto.createDecipheriv('aes-128-cbc', Buffer.from('userpassword', 'hex'), iv);
    // let encryptedPass = key.update('pass1234');
    // encryptedPass = Buffer.concat([encryptedPass, key.final()])
    const icsAdmins = new ics({ adminName: "Ryan Resoles", adminPassword: 'pass1234', adminEmail: "sample@up.edu.ph"});

    try{
        await icsAdmins.save();
        res.send('User Added.')
    } catch(err) {
        console.log(err)
    }
});

module.exports = router;