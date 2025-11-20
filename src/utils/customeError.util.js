export class customError extends Error{
    constructor(message,statuscode){
        super(message);
        this.statuscode=statuscode
    }
}
export class badRequest extends customError{
    constructor(message){
        super(message)
        this.statuscode=400
    }
}
export class notFound extends customError{
    constructor(message){
        super(message)
        this.statuscode=404
    }
}
export class unauthenticated extends customError{
    constructor(message){
        super(message)
        this.statuscode=401
    }
}
export class unauthorizedError extends customError{
   constructor(message){
        super(message)
        this.statuscode=403
    }
}