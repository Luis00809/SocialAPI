const router = require('express').Router();
const { User, Thought, Reaction } = require('../../models');


// create a thought 
router.post('/create', async (req,res) => {
    try {
        const thought = await Thought.create(req.body)

        const toUser = await User.findOne({ username: req.body.username })
        .populate('thoughts');

        await User.findOneAndUpdate(
            { username: req.body.username },
            { $push: { thoughts: thought._id } }
          );

        res.status(200).json(thought)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// update a Thought
router.put('/update/:id', async (req, res) => {
    try {
        
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.id},
            req.body,
            { new: true }
        );

        res.status(200).json(thought);

    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// delete a Thought
router.delete('/delete/:id', async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.id});
        res.json(thought);

    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

module.exports = router;