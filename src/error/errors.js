export default function conflictError(entity) {
    return {
        type: "CONFLICT"
    }
}

export default function notFoundError(entity) {
    return {
        type: "NOT FOUND"
    }
}

export default function unprocessableError(entity) {
    return {
        type: "UNPROCESSABLE ENTITY"
    }
}

export default function badRequestError(entity) {
    return {
        type: "BAD REQUEST"
    }
}