const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case "SequelizeValidationError":
            const validate = err.errors.map(el => {
                return el.message
            })

            res.status(400).json({
                status: 'error',
                message: validate
            })
            break;
        case "SequelizeUniqueConstraintError":
            const validateUnique = err.errors.map(el => {
                return el.message
            })

            res.status(400).json({
                status: 'error',
                message: validateUnique
            })
            break;
        case "exists":
            res.status(400).json({
                status: 'error',
                message: 'you already have data'
            })
            break;
        case "validateLogin":
            res.status(401).json({
                status: 'error',
                message: 'wrong email or password'
            })
            break;
        case "notFound":
            res.status(404).json({
                status: 'error',
                message: 'not found'
            })
            break;

        default:
            res.status(500).json({
                status: 'error',
                message: err.message
            })
            break;
    }
}

module.exports = errorHandler;