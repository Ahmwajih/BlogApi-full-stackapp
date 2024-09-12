const Like = require('../models/like');

module.exports = {
    list : async (req, res, next) => {
        // swagger tags
        /**
         * @swagger
         * /like:
         *  get:
         *    tags:
         *      - Like
         *    summary: List of Likes
         *    description: List of Likes
         *    responses:
         *      '200':
         *        description: A successful response
         */
        const likes = await Like.find()
        res.status(200).send({
            error: false,
            message: 'List of Likes',
            data: likes,
            details: await res.getModelListDetails(Like)
        })},

        read: async (req, res, next) => {
            // swagger tags
            /**
             * @swagger
             * /like/{id}:
             *  get:
             *    tags:
             *      - Like
             *    summary: Get Like
             *    description: Get Like
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
            const like = await Like.findById(req.params.id)
            res.status(200).send({
                error: false,
                message: 'Like Found',
                data: like,
                details: await res.getModelListDetails(Like)
            })}
}