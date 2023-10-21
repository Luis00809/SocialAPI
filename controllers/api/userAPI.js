const router = require('express').Router();
const { User, Thought, Reaction } = require('../../models');
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
        const user = await User.findOneAndUpdate(
                { _id: req.params.id},
                req.body,
                { new: true }
            );
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// delete a user
router.delete('/delete/:id', async (req,res) => {
    try {
        
        const user = await User.findOneAndDelete({ _id: req.params.id});
       
        res.json(user);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}); 

// add a friend
router.post('/:userId/addFriend/:friendId', async (req,res) => {
    try {
        const user = await User.findById(req.params.userId);

        user.friends.push(req.params.friendId);

        await user.save();

        res.status(200).json(user)

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// delete a friend
router.delete('/:userId/deleteFriend/:friendId', async (req,res) => {
    try {
        const user = await User.findById(req.params.userId);
        user.friends = user.friends.filter(friendId => friendId.toString() !== req.params.friendId);

        await user.save();
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});


module.exports = router;