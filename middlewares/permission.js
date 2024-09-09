module.exports = {

    isLogin: (req, res, next) => {
        if (req.user) {
            console.log('User is LOGGED IN');
            next();
        } else {
            res.errorStatusCode = 403;
            next(new Error('NoPermission: You must login.'));
        }
    },

    isAdmin: (req, res, next) => {
        if (req.user && req.user.isAdmin) {
            console.log('User is an ADMIN');
            next();
        } else {
            res.errorStatusCode = 403;
            next(new Error('NoPermission: You must login and be an Admin.'));
        }
    },

    isStaff: (req, res, next) => {
        if (req.user && req.user.isStaff) {
            console.log("User is Staff!");
            next();
        } else {
            res.errorStatusCode = 403;
            next(new Error("NoPermission: You must login and be a Staff member."));
        }
    },

    isActive: (req, res, next) => {
        if (req.user && req.user.isActive) {
            console.log("User is Active!");
            next();
        } else {
            res.errorStatusCode = 403;
            next(new Error("NoPermission: You must be an active Staff member."));
        }
    },

};