import mongoose from  'mongoose';
import { IClient } from './client.model';
import { IFournisseur } from './fournisseur.model';
import { IProduit } from './produit.model';


export interface IProduitCommande {
    produit: IProduit,
    quantite: number;
    prixTotal: number
}
export interface ICommande {
    _id: string;
    client: IClient;
    fournisseur: IFournisseur;
    dateCommande: Date;
    commande: [IProduitCommande];
    createdAt: Date;
    updatedAt: Date;
}

export type CommandeDoc = mongoose.Document & ICommande;

interface ICommandeModel extends mongoose.Model<CommandeDoc>{
    build(attr: CommandeDoc): ICommande;
}


const commandeSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        require: true
    },
    fournisseur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fournisseur',
        require: true
    },
    commande: [
        {
            produit: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Produit',
                require: true
            },
            quantite: {
                type: Number,
                require: true
            },
            prixTotal: {
                type: Number,
                require: true
            }
        }
    ],
    dateCommande: {
        type: Date,
        require: true,
        default: Date.now
    },
    createdAt: {
        type: Date,
        require: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        require: true
    }
});

const Commande = mongoose.model<CommandeDoc, ICommandeModel>('Commade', commandeSchema);

export default Commande;