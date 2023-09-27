import express from 'express';
import *as produitCtrl from '../controllers/produit.controller';
import *as checkAuth from '../middlewares/fournisseur.middlewares'
const produitRouter = express.Router();

produitRouter.post('/new-product',checkAuth.checkAuthFournisseur, produitCtrl.creeProduit);
produitRouter.put('/update-product/:id', produitCtrl.updateProduct);
produitRouter.get('/get-product/:id',produitCtrl.getProduct)
produitRouter.delete('/delete-product/:id', produitCtrl.deleteProduct);
produitRouter.get('/',produitCtrl.getProducts);
produitRouter.post('/chat-gpt', produitCtrl.runResponseChatGpt);

module.exports = produitRouter;