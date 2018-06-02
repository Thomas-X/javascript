import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    owner: {type: String},
    votes: {type: []},
    selection: {type: []},
    eligibleVoters: {type: []},
});

export default mongoose.model('Poll', schema);