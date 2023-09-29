import Produit, { ProduitDoc } from '../models/produit.model';
import {Request, Response} from 'express';
import Configuration from 'openai';
import OpenAIApi from 'openai';
    

const openai = new OpenAIApi({
        apiKey: process.env.OPENAI_KEY
})
export const runResponseChatGpt = async (req: Request, res: Response) => {
    const question = req.body.question;
    
    // const response = await openai.createChatCompletion({
    //     model: 'gpt-3.5-turbo',
    //     message: [
    //         {
    //             role: 'user', 
    //             content: question
    //         }
    //     ]
    // });
    // const resFinal = response.data.choices[0].message.content
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{
            role: 'user',
            content: question
        }]
    });
    
    const resFinal = response.choices[0].message.content;

    res.json({
        reponse: resFinal
    })
}

export const creeProduit = async (req: Request, res: Response) => {
    const productData = req.body;
    console.log("Id de l'utilisateur connecté: "+(req as any).userData.userId)
    console.log("Email de l'utilisateur connecté: "+(req as any).userData.email)
    const question = productData.questionDescription;
    try {
        const response = await runChatGptResponse(question);
        productData.description = response;
        console.log(response);

        const newProduct: ProduitDoc = new Produit(productData);
        
        await newProduct.save();

        res.status(200).json(newProduct);
    } catch (error) {
        res.status(500).json({
            message: 'Error: '+ error
        })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const productId = req.params.id;
    const productData = req.body
    try {
        const product = await Produit.findByIdAndUpdate(productId, productData);

        res.status(200).json({
            message: 'Modification effectué!',
            product
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error: '+error
        })
    }
}


export const deleteProduct = async (req: Request, res: Response) => {
    const productId = req.params.id;
    
    try {
        await Produit.findByIdAndRemove(productId);

        res.status(200).json({
            message: 'delete effectué!',
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error: '+error
        })
    }
}

export const getProduct = async (req: Request, res: Response)=> {
    const productId = req.params.id;

    const product: ProduitDoc = await Produit.findById(productId);
    res.status(200).json(product)
}

export const getProducts = async (req: Request, res: Response) => {
    
    try {
        const products: ProduitDoc[] = 
        await Produit
        .find()
        .populate('fournisseur');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: 'Error:'+error
        })
    }
}

const runChatGptResponse = async (question: string) => {
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{
            role: 'user',
            content: question
        }]
    });
    return response.choices[0].message.content;
}
