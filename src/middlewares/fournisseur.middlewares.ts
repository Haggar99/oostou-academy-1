import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

export const checkAuthFournisseur = (req: Request,res: Response, next: NextFunction) => {
    try {
        // recuperation de token 
        const token = req.headers.authorization;

        console.log('token: ', token);

        const userData = jwt.verify(
            token,
            'FOURNISSEUR123'
        );
        (req as any).userData = userData;
        next();
    } catch (error) {
        throw new Error("Erreur de connexion: "+error);
        
    }
}