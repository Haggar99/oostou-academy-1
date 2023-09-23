import mongoose from "mongoose";

export interface IClient {
    _id: string;
    nom: string;
    prenom: string;
    phone: string;
    age: string;
    email: string;
    password: string
    createdAt: Date;
    updatedAt: Date
}

export type ClientDoc = mongoose.Document & IClient;

interface IClientModel extends mongoose.Model<ClientDoc> {
    build(attr: IClient): ClientDoc
}

const clientSchema = new mongoose.Schema({
    nom: {
        type: String,
        require: true
    },
    prenom: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true,
        unique: true
    },
    age: {
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


const Client = mongoose.model<ClientDoc, IClientModel>('Client', clientSchema);

export default Client;


