const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        email: { 
            type: String, 
            required: true, 
            unique: true, 
            trim: true,
            validate: {
                validator: function(v) {
                    let mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return mail.test(String(v).toLocaleLowerCase());
                },
                message: props => `${props.value} is not a valid email!`
                } 
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
        friends: [{ type: Schema.Types.ObjectId, ref: 'User'}]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

userSchema.post('findOneAndDelete', async function(doc) {
    if(doc && thoughts) {
        await Thought.deleteMany({_id: { $in: doc.thoughts } });
    };
});

const User = model('User', userSchema);

const errorHandler = (err) => console.log(err);

module.exports = User;
