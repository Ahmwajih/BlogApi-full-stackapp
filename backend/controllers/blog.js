const Blog = require('../models/blog');

module.exports = {
    list : async (req, res, next) => {
        // swagger tags
        /**
         * @swagger
         * /blog:
         *  get:
         *    tags:
         *      - Blog
         *    summary: List of Blogs
         *    description: List of Blogs
         *    responses:
         *      '200':
         *        description: A successful response
         */
        const blogs = await Blog.find()
        res.status(200).send({
            error: false,
            message: 'List of Blogs',
            data: blogs,
            details: await res.getModelListDetails(Blog)
        })},

        read: async (req, res, next) => {
            // swagger tags
            /**
             * @swagger
             * /blog/{id}:
             *  get:
             *    tags:
             *      - Blog
             *    summary: Get Blog
             *    description: Get Blog
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
            const blog = await Blog.findById(req.params.id)
            res.status(200).send({
                error: false,
                message: 'Blog Found',
                data: blog,
                details: await res.getModelListDetails(Blog)
            })},

        create: async (req, res, next) => {
            // swagger tags
            /**
             * @swagger
             * /blog:
             *  post:
             *    tags:
             *      - Blog
             *    summary: Create Blog
             *    description: Create Blog
             *    requestBody:
             *      required: true
             *      content:
             *        application/json:
             *          schema:
             *            type: object
             *            properties:
             *              title:
             *                type: string
             *              content:
             *                type: string
             *              image:
             *                type: string
             *              published_date:
             *                type: date
             *              last_update:
             *                type: date
             *              slug:
             *                type: string
             *              status:
             *                type: string
             *              category:
             *                type: string
             * 
             *   responses:
             *     '201':
             *      description: A successful response
             */
            const blog = new Blog(req.body)
            await blog.save()
            res.status(201).send({
                error: false,
                message: 'Blog Created',
                data: blog,
                details: await res.getModelListDetails(Blog)
            })},

        update: async (req, res, next) => {
            // swagger tags
            /**
             * @swagger
             * /blog/{id}:
             *  put:
             *    tags:
             *      - Blog
             *    summary: Update Blog
             *    description: Update Blog
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
             *              title:
             *                type: string
             *              content:
             *                type: string
             *              image:
             *                type: string
             *              published_date:
             *                type: date
             *              last_update:
             *                type: date
             *              slug:
             *                type: string
             *              status:
             *                type: string
             *              category:
             *                type: string
             *    responses:
             *      '200':
             *        description: A successful response
             */
            const blog = await Blog.findByIdAndUpdate(req.params.id, req.body)
            res.status(200).send({
                error: false,
                message: 'Blog Updated',
                details: await res.getModelListDetails(Blog)
            })},

        delete: async (req, res, next) => {
            // swagger tags
            /**
             * @swagger
             * /blog/{id}:
             *  delete:
             *    tags:
             *      - Blog
             *    summary: Delete Blog
             *    description: Delete Blog
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
            const blog = await Blog.findByIdAndDelete(req.params.id)
            res.status(200).send({
                error: false,
                message: 'Blog Deleted',
                details: await res.getModelListDetails(Blog)
            })}

}