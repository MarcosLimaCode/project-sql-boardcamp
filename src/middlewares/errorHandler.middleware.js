export default function errorHandler(error, req, res, next) {
    
    if (error.type === "CONFLICT") {
        return res.status(409).send(error.message)
    }
    
    if (error.type === "NOT FOUND") {
        return res.status(404).send(error.message)
    }

    if (error.type === "UNPROCESSABLE ENTITY") {
        return res.status(422).send(error.message)
    }
    
    if (error.type === "BAD REQUEST") {
        return res.status(400).send(error.message)
    }

    return res.status(500).send(error.message)
    }