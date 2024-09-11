const Comments = require('../models/comment');

exports.createComment = async (req, res) => {
    const comment = new Comments(req.body);
    await comment.save();
    res.status(201).send({
        error: false,
        message: 'Comment Created',
        data: comment,
        details: await res.getModelListDetails(Comments)
    });
};

exports.updateComment = async (req, res) => {
    const comment = await Comments.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send({
        error: false,
        message: 'Comment Updated',
        details: await res.getModelListDetails(Comments)
    });
}

exports.deleteComment = async (req, res) => {
    const comment = await Comments.findByIdAndDelete(req.params.id);
    res.status(200).send({
        error: false,
        message: 'Comment Deleted',
        details: await res.getModelListDetails(Comments)
    });
}

exports.listComment = async (req, res) => {
    const comments = await Comments.find();
    res.status(200).send({
        error: false,
        message: 'List of Comments',
        data: comments,
        details: await res.getModelListDetails(Comments)
    });
}

exports.readComment = async (req, res) => {
    const comment = await Comments.findById(req.params.id);
    res.status(200).send({
        error: false,
        message: 'Comment Found',
        data: comment,
        details: await res.getModelListDetails(Comments)
    });
}
