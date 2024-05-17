import Category from '../models/Category.model.js';

const categoryRepository = {
    create: async ({ name , description }) => {
        return await Category.create({ name, description});
    },
    getAll: async () => {
        return await Category.find();
    },
};
export default categoryRepository;