import Client, {ClientDoc} from "../models/client.model";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const creeClient = async (req: Request, res: Response) => {
    const userData = req.body;

    try {
        const client = await Client.findOne({email: userData.email});
        if (client) {
            res.status(505).json({message: 'Email entré exist déjà!'})
        } else {
            const hash = await bcrypt.hash(userData.password, 10);
            userData.password = hash;
            const newClient = new Client(userData);
            if(userData.phone.lenght != 12) {
                
            }
            await newClient.save();
            res.status(201).json({
                message: "Votre compte a été crée avec succé!",
                newClient
            })
        }
        
    } catch (error) {
        res.status(500).json({message: 'error: '+error})
    }
}


export const loginClient = async (req: Request, res: Response) => {
    const userData = req.body;
    try {
        const client = await Client.findOne({email: userData.email});
        if(client){
            const passwordIsValid = await bcrypt.compare(userData.password, client.password);
            if (passwordIsValid) {
                const token = jwt.sign(
                    {
                        userId: client._id,
                        email: client.email
                    },
                    'CLIENT123',
                    {
                        expiresIn: '3h'
                    }
                );
                res.status(201).json({
                    message: 'Vous etes connecté',
                    token: token,
                    client
                })
            } else {
                res.status(505).json({msg: 'mot de passe invalid!'})
            }
        }else {
            res.status(404).json({
                message: 'User not found!'
            });
        }
        
    } catch (error) {
        res.status(500).json({msg: 'error: '+ error})
    }
}