import mongoose from "mongoose";

export interface IFournisseur {
    _id: string;
    nom: string;
    prenom: string;
    phone: string;
    age: string;
    email: string;
    password?: string
    createdAt: Date;
    updatedAt: Date
}

export type FournisseurDoc = mongoose.Document & IFournisseur;

interface IFournisseurModel extends mongoose.Model<FournisseurDoc> {
    build(attr: IFournisseur): FournisseurDoc
}

const fournisseurSchema = new mongoose.Schema({
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


const Fournisseur = mongoose.model<FournisseurDoc, IFournisseurModel>('Fournisseur', fournisseurSchema);

export default Fournisseur;


