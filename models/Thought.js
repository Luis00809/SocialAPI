const router = require('express').Router();
const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
        createdAt: { 
            type: Date, 
            default: Date.now,
            get: function(timestamp) {
                return timestamp.toDateString();
            }
         },
        username: { type: String, required: true },
        reactions: [ {type: Schema.Types.ObjectId, ref: "Reaction"} ]
    }, 
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);


thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

const errorHandler = (err) => console.log(err);

module.exports = Thought;