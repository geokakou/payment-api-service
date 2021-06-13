import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";

export class PaymentNotFound extends NotFoundException {
    constructor() {
        super({
            code: 'ERR_PAYMENT_NOT_FOUND',
            message: 'Could not find payment'
        });
    }
}

export class PaymentCannotApprove extends BadRequestException {
    constructor() {
        super({
            code: 'ERR_CANNOT_APPROVE',
            message: 'Cannot approve a payment that has already been canceled'
        });
    }
}

export class PaymentCannotCancel extends BadRequestException {
    constructor() {
        super({
            code: 'ERR_CANNOT_CANCEL',
            message: 'Cannot cancel a payment that has already been approved'
        });
    }
}


export class TokenExpired extends UnauthorizedException {
    constructor() {
        super({
            code: 'ERR_AUTH_TOKEN_EXPIRED',
            message: 'Auth token expired'
        });
    }
}

export class TokenError extends UnauthorizedException {
    constructor() {
        super({
            code: "ERR_UNATHORIZED",
            message: "No valid token provided"
        });
    }
}