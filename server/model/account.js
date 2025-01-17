import { Schema, model } from 'mongoose';

export default model('Accounts', new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    accNr: {
        type: String,
        require: true,
        unique: true
    },
    persNr: {
        type:Number,
        require: true,
        unique: true
    },
    docPhoto: {
        type: String,
        require: true
    },
    balance: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
}));