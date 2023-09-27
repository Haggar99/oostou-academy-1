import mongoose from "mongoose";
import { IFournisseur } from "./fournisseur.model";


export interface IProduit {
    _id: string;
    titre: string;
    description: string;
    fournisseur: IFournisseur;
    price: number;
    quantite: number;
    dateExpiration: Date;
    createAt: Date;
    updatedAt: Date
} 


export type ProduitDoc = IProduit & mongoose.Document;

interface IProduitModel extends mongoose.Model<ProduitDoc> {
    buitld(attr: IProduit): ProduitDoc
}


const produitSchema = new mongoose.Schema({
    titre: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    fournisseur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fournisseur',
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    quantite: {
        type: Number,
        require: true
    },
    dateExpiration: {
        type: Date
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

const Produit = mongoose.model<ProduitDoc, IProduitModel>('Produit', produitSchema);

export default Produit;