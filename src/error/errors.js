export function conflictError(entity) {
    return {
        type: "CONFLICT",
        message: `${entity} já cadastrado.`
    }
}

export function notFoundError(entity) {
    return {
        type: "NOT FOUND",
        message: `${entity} não encontrado.`
    }
}

export function unprocessableError(entity) {
    return {
        type: "UNPROCESSABLE ENTITY",
        message: `${entity}`
    }
}

export function badRequestError() {
    return {
        type: "BAD REQUEST",
        message: "O aluguel ainda não foi finalizdo."
    }
}