const Category =  require('../models/categories');

module.exports = {

    list : async (req, res, next) => {
        // swagger tags
        /**
         * @swagger
         * /categories:
         *  get:
         *    tags:
         *      - Categories
         *    summary: List of Categories
         *    description: List of Categories
         *    responses:
         *      '200':
         *        description: A successful response
         */
        const categories = await Category.find()
        res.status(200).send({
            error: false,
            message: 'List of Categories',
            data: categories,
            details: await res.getModelListDetails(Category)
        })},

        read: async (req, res, next) => {
            // swagger tags
            /**
             * @swagger
             * /categories/{id}:
             *  get:
             *    tags:
             *      - Categories
             *    summary: Get Category
             *    description: Get Category
             *    parameters:
             *      - in: path
             *        name: id
             *        required: true
             *        schema:
             *          type: string
             *    responses:
             *      '200':
             *        description: A successful response
             */
            const category = await Category.findById(req.params.id)
            res.status(200).send({
                error: false,
                message: 'Category Found',
                data: category,
                details: await res.getModelListDetails(Category)
            })},

        create: async (req, res, next) => {
            // swagger tags
            /**
             * @swagger
             * /categories:
             *  post:
             *    tags:
             *      - Categories
             *    summary: Create Category
             *    description: Create Category
             *    requestBody:
             *      required: true
             *      content:
             *        application/json:
             *          schema:
             *            type: object
             *            properties:
             *              name:
             *                type: string
             *    responses:
             *      '201':
             *        description: A successful response
             */
            const category = new Category(req.body)
            await category.save()
            res.status(201).send({
                error: false,
                message: 'Category Created',
                data: category,
                details: await res.getModelListDetails(Category)
            })},

        update: async (req, res, next) => {
            // swagger tags
            /**
             * @swagger
             * /categories/{id}:
             *  put:
             *    tags:
             *      - Categories
             *    summary: Update Category
             *    description: Update Category
             *    parameters:
             *      - in: path
             *        name: id
             *        required: true
             *        schema:
             *          type: string
             *    requestBody:
             *      required: true
             *      content:
             *        application/json:
             *          schema:
             *            type: object
             *            properties:
             *              name:
             *                type: string
             *    responses:
             *      '200':
             *        description: A successful response
             */
            const category = await Category.findByIdAndUpdate(req.params.id, req.body)
            res.status(200).send({
                error: false,
                message: 'Category Updated',
                details: await res.getModelListDetails(Category)
            })},

        delete: async (req, res, next) => {
            // swagger tags
            /**
             * @swagger
             * /categories/{id}:
             *  delete:
             *    tags:
             *      - Categories
             *    summary: Delete Category
             *    description: Delete Category
             *    parameters:
             *      - in: path
             *        name: id
             *        required: true
             *        schema:
             *          type: string
             *    responses:
             *      '200':
             *        description: A successful response
             */
            const category = await Category.findByIdAndDelete(req.params.id)
            res.status(200).send({
                error: false,
                message: 'Category Deleted',
                details: await res.getModelListDetails(Category)
            })}
        }