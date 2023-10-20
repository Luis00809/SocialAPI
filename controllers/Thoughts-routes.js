const router = require('express').Router();
const { User, Thought, Reaction } = require('../models');

// get all thoughts 
router.get('/all', async (req, res) => {
    try {
        
        const thoughts = await Thought.find()
        res.status(200).json(thoughts)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// get one Thought
router.get('/thought/:id', async (req,res) => {
    try {
        
        const thought = await Thought.findOne( { _id: req.params.id })
            .select('-__v');

    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});




module.exports = router;