import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import Fournisseur, { FournisseurDoc } from '../models/fournisseur.model';

export const creeFournisseur = async (req: Request, res: Response) => {
    const userData = req.body;

    try {
        const fournisseur: FournisseurDoc = await Fournisseur.findOne({email: userData.email});

        if (fournisseur) {
            res.status(400).json({message: 'le compte existe déjà!'});
        } else {
            const hash = await bcrypt.hash(userData.password, 10);
            userData.password = hash;
            const newFournisseur = new Fournisseur(userData);

            await newFournisseur.save();
            res.status(200).json({
                message: 'Vote a été bien crée!',
                fournisseur: newFournisseur
            })
        }
    } catch (error) {
        res.status(505).json({message: 'Une erreur est survenus: '+ error})
    }
}

export const loginFounisseur = async (req: Request, res: Response) => {

    const { email, password} = req.body;

    try {
        const fournisseur: FournisseurDoc = await Fournisseur.findOne({email: email});
        if (fournisseur) {
            const passwordIsValid = await bcrypt.compare(password, fournisseur.password);
            if (passwordIsValid) {
                const token = await jwt.sign(
                    {
                        userId: fournisseur._id,
                        email: fournisseur.email
                    },
                    'FOURNISSEUR123',
                    {
                        expiresIn: '2h'
                    }
                );
                res.status(200).json({message: 'connecté!', fournisseur, token})
            } else {
                res.status(400).json({
                    message: 'Le mot de passe est incorrect!'
                })
            }
        } else {
            res.status(404).json({message: "L'email entré n'exite pas!"})
        }
    } catch (error) {
        res.status(505).json({message: 'error: '+ error})
    }
}