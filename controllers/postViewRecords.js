const PostViewRecord = require('../models/postViewRecords');


module.exports = {
    list : async (req, res, next) => {
        // swagger tags
        /**
         * @swagger
         * /postViewRecords:
         *  get:
         *    tags:
         *      - PostViewRecords
         *    summary: List of PostViewRecords
         *    description: List of PostViewRecords
         *    responses:
         *      '200':
         *        description: A successful response
         */
        const postViewRecords = await PostViewRecord.find()
        res.status(200).send({
            error: false,
            message: 'List of PostViewRecords',
            data: postViewRecords,
            details: await res.getModelListDetails(PostViewRecord)
        })},

        read: async (req, res, next) => {
            // swagger tags
            /**
             * @swagger
             * /postViewRecords/{id}:
             *  get:
             *    tags:
             *      - PostViewRecords
             *    summary: Get PostViewRecord
             *    description: Get PostViewRecord
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
            const postViewRecord = await PostViewRecord.findById(req.params.id)
            res.status(200).send({
                error: false,
                message: 'PostViewRecord Found',
                data: postViewRecord,
                details: await res.getModelListDetails(PostViewRecord)
            })},

        create: async (req, res, next) => {
            // swagger tags
            /**
             * @swagger
             * /postViewRecords:
             *  post:
             *    tags:
             *      - PostViewRecords
             *    summary: Create PostViewRecord
             *    description: Create PostViewRecord
             *    requestBody:
             *      content:
             *        application/json:
             *          schema:
             *            $ref: '#/components/schemas/PostViewRecord'
             *    responses:
             *      '201':
             *        description: A successful response
             */
            const postViewRecord = new PostViewRecord(req.body)
            await postViewRecord.save()
            res.status(201).send({
                error: false,
                message: 'PostViewRecord Created',
                data: postViewRecord,
                details: await res.getModelListDetails(PostViewRecord)
            })},

        update: async (req, res, next) => {
            // swagger tags
            /**
             * @swagger
             * /postViewRecords/{id}:
             *  put:
             *    tags:
             *      - PostViewRecords
             *    summary: Update PostViewRecord
             *    description: Update PostViewRecord
             *    parameters:
             *      - in: path
             *        name: id
             *        required: true
             *        schema:
             *          type: string
             *    requestBody:
             *      content:
             *        application/json:
             *          schema:
             *            $ref: '#/components/schemas/PostViewRecord'
             *    responses:
             *      '200':
             *        description: A successful response
             */
            const postViewRecord = await PostViewRecord.findByIdAndUpdate(req.params.id, req.body)
            res.status(200).send({
                error: false,
                message: 'PostViewRecord Updated',
                data: postViewRecord,
                details: await res.getModelListDetails(PostViewRecord)
            })},

        delete: async (req, res, next) => {
            // swagger tags
            /**
             * @swagger
             * /postViewRecords/{id}:
             *  delete:
             *    tags:
             *      - PostViewRecords
             *    summary: Delete PostViewRecord
             *    description: Delete PostViewRecord
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
            await PostViewRecord.findByIdAndDelete(req.params.id)
            res.status(200).send({
                error: false,
                message: 'PostViewRecord Deleted',
                details: await res.getModelListDetails(PostViewRecord)
            })}
}