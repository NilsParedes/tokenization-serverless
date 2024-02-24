import {model, Schema} from "mongoose";

const card = new Schema({
    token: String,
    cardNumber: String,
    cvv: String,
    expirationMonth: String,
    expirationYear: String,
    email: String,
    createdAt: {type: Date, default: Date.now, expires: '15m'}
});

export const CardSchema = model('Card', card);