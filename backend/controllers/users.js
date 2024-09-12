const User = require('../models/users')

module.exports = {

    list : async (req, res, next) => {
        const users = await User.find()
        res.status(200).send({
            error: false,
            message: 'List of Users',
            data: users,
            details: await res.getModelListDetails(User)
        })},

    create : async (req, res, next) => {
        const user = new User(req.body)
        await user.save()
        res.status(201).send({
            error: false,
            message: 'User Created',
            data: user,
            details: await res.getModelListDetails(User)
        })},

    read : async (req, res, next) => {
        const user = await User.findById(req.params.id)
        res.status(200).send({
            error: false,
            message: 'User Found',
            data: user,
            details: await res.getModelListDetails(User)
        })},

    update : async (req, res, next) => {
        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send({
            error: false,
            message: 'User Updated',
            details: await res.getModelListDetails(User)
        })},

    delete : async (req, res, next) => {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).send({
            error: false,
            message: 'User Deleted',
            details: await res.getModelListDetails(User)
        })}
}