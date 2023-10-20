const router = require('express').Router();
const { User } = require('../models');


// find all users
router.get('/all', async (req, res) => {
    try {
        
        const user = await User.find();
        res.status(200).json(user);

    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})


// find a single user by id
router.get('/user/:id', async (req,res) => {
    try {
        
        const user = await User.findOne({ _id: req.params.id})
            .select('-__v')
            .populate({
                path: 'thoughts',
                populate: {
                    path: 'reactions',
                    model: 'Reaction'
                }
            })

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        res.json(user);
    } catch (er) {
        console.log(err);
        res.status(500).json(err)
    }
});

module.exports = router;