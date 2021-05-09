function errorHandler(err, req, res, next) {
    res
        .status(err.status)
        .json({
            success: false,
            msg: err.msg
        });
}





module.exports = errorHandler;