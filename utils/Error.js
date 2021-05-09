class CustomError {

    constructor(status) {
        this.status = status;
    }

    getError(msg) {
        return {
            status: this.status,
            msg: msg
        };
    }
}



exports.badRequest = new CustomError(400);
exports.internalServerError = new CustomError(500);