import express = require('express');
import bodyParser = require('body-parser');

const cors = require('cors');
const morgan = require('morgan');

// importation des routes

const clientRouter = require('./routes/client.routes');
const fournisseurRouter = require('./routes/fournisseur.routes');
const productRouter = require('./routes/produit.routes')

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());
app.use(morgan('dev'));

app.use(
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    res.setHeader('Access-Control-Allow-Credentials', 1);
    next();
    }

);

app.use('/api/fournisseur', fournisseurRouter);
app.use('/api/client', clientRouter);
app.use('/api/product', productRouter)

export default app;

