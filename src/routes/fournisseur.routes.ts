import express from 'express';
import *as fournisseurCtrl from '../controllers/fournisseur.controllers';

const fournisseurRouter = express.Router();

fournisseurRouter.post('/new-fournisseur', fournisseurCtrl.creeFournisseur);
fournisseurRouter.post('/login-fournisseur', fournisseurCtrl.loginFounisseur);

module.exports = fournisseurRouter;