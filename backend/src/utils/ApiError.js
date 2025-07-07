class ApiError {
    constructor(
        statusCode, message = "Something went wrong", errors = []
    ) {
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.errorMessage = errors?.message
        this.errors = errors
    }
}
export {ApiError}