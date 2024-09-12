const Comments = require('../models/comment');

module.exports = {
    create: async (req, res) => {
        try {
            const comment = new Comments(req.body);
            await comment.save();
            res.status(201).send({
                error: false,
                message: 'Comment Created',
                data: comment,
                details: await res.getModelListDetails(Comments)
            });
        } catch (error) {
            res.status(500).send({
                error: true,
                message: 'Error creating comment',
                details: error.message
            });
        }
    },

    update: async (req, res) => {
        try {
            const comment = await Comments.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).send({
                error: false,
                message: 'Comment Updated',
                data: comment,
                details: await res.getModelListDetails(Comments)
            });
        } catch (error) {
            res.status(500).send({
                error: true,
                message: 'Error updating comment',
                details: error.message
            });
        }
    },

    delete: async (req, res) => {
        try {
            await Comments.findByIdAndDelete(req.params.id);
            res.status(200).send({
                error: false,
                message: 'Comment Deleted',
                details: await res.getModelListDetails(Comments)
            });
        } catch (error) {
            res.status(500).send({
                error: true,
                message: 'Error deleting comment',
                details: error.message
            });
        }
    },

    list: async (req, res) => {
        try {
            const comments = await Comments.find();
            res.status(200).send({
                error: false,
                message: 'List of Comments',
                data: comments,
                details: await res.getModelListDetails(Comments)
            });
        } catch (error) {
            res.status(500).send({
                error: true,
                message: 'Error listing comments',
                details: error.message
            });
        }
    },

    read: async (req, res) => {
        try {
            const comment = await Comments.findById(req.params.id);
            res.status(200).send({
                error: false,
                message: 'Comment Found',
                data: comment,
                details: await res.getModelListDetails(Comments)
            });
        } catch (error) {
            res.status(500).send({
                error: true,
                message: 'Error reading comment',
                details: error.message
            });
        }
    }
};