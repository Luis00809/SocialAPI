const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const reactionSchema = new Schema(
    {
        reactionId: { 
            type: mongoose.ObjectId,
            default: function() {
                return new mongoose.Types.ObjectId();
            }
        },
        reactionBody: { type: String, required: true, maxLength: 280},
        username: { type: String, required: true},
        createdAt: {
            type: Date, 
            default: Date.now,
            get: function(timestamp) {
                return timestamp.toDateString();
            }
        }
    }
);

const Reaction = model('Reaction', reactionSchema);
const errorHandler = (err) => console.log(err);

module.exports = Reaction;