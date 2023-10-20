const router = require('express').Router();
const { User, Thoughts, Reaction } = require('../models');
// import ObjectId???


// create a user
router.post('/create', async (req,res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});


// update a user
router.put('/update/:id', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate()
    } catch (err) {
        console.log(err);
        res.status(500).json(user)
    }
});

// delete a user
router.delete('/delete/:id', async (req,res) => {
    try {
        
        const user = await User.findOneAndDelete({ _id: req.params.id});
       
        await Application.deleteMany( { _id: { $in: user.applications } });

        res.json(user, { message: 'User and associated apps deleted!' } );

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})


module.exports = router;