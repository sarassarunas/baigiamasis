import { Schema, model } from 'mongoose';

export default model('Accounts', new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    accNr: {
        type: String,
        required: true,
        unique: true
    },
    persNr: {
        type:Number,
        required: true,
        unique: true
    },
    docPhoto: {
        type: String,
        required: true
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