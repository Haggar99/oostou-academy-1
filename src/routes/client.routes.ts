import express from 'express';
import *as clientCtrl from '../controllers/client.controllers';

const clientRouter = express.Router();

clientRouter.post('/new-client', clientCtrl.creeClient);

module.exports = clientRouter;