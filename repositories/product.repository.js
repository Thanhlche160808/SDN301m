import Product from '../models/product.model.js';
import Image from '../models/image.model.js';
import Category from '../models/Category.model.js';
import Comment from '../models/comment.model.js';

const productRepository = {
    create: async ({name, price, images=[], category}) => {
            return await Category.findOne({name: category}).then(docCategory => {
                Product.create({name, price, category: docCategory._id}).then(docProduct => {
                    images.map(({url, caption, path}) => {
                        Image.create({url, caption, path, createdAt: Date.now()}).then(docImage => {
                            return Product.findByIdAndUpdate(docProduct._id, {
                                $push: {
                                    images: {
                                        _id: docImage._id,
                                        url: url,
                                        caption: caption,
                                    }
                                }})
                        })
                    })
                });
            })
    },
    getAll: async () => {
        return await Product.find();
    },
    addComment: async (id, comments = []) => {
            comments.map(({user, text, content}) => {
                Comment.create({user, text, content}).then(docComment => {
                    return Product.findByIdAndUpdate(id, {
                        $push: {
                            comments: docComment._id
                        }})
                })
            })
    },
    getAllCommentById: async (id) => {
        const product = await Product.findById(id).populate('comments');
        return product.comments;
    },
};

export default productRepository;