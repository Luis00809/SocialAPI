const router = require('express').Router();
const { User, Thought, Reaction } = require('../../models');

// create a Reaction
router.post('/create/:thoughtId', async (req,res) => {
    try {
        const reaction = await Reaction.create(req.body);

        const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
        thought.reactions.push(reaction._id);

        await thought.save();

        res.status(200).json(reaction);

    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// delete a reaction thats in a thought
router.delete('/delete/reaction/:reactionId/from/:thoughtId', async (req, res) => {
    try {
        const fromThought = await Thought.findById(req.params.thoughtId);

        fromThought.reactions = fromThought.reactions.filter(reactionId => reactionId.toString() !== req.params.reactionId)
        await fromThought.save();

        res.status(200).json(fromThought);

    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})


module.exports = router;