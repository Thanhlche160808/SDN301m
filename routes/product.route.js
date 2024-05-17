import express from 'express';
import controllers from '../controllers/index.js';

const productRouter = express.Router();
productRouter.post('/product', controllers.productController.create);
productRouter.get('/product', controllers.productController.getAll);
productRouter.get('/product/:id', controllers.productController.getById);
productRouter.post('/product/:id/comment', controllers.productController.addComment);
productRouter.get('/product/:id/comments', controllers.productController.getAllComment);

export default productRouter;