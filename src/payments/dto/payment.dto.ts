import { IsString, IsOptional, IsNumber, IsNotEmpty} from "class-validator";
import { v4 as uuidv4 } from 'uuid';

export class CreatePaymentDTO{
    @IsString()
    @IsNotEmpty()
    payeeId: string;
    
    @IsString()
    @IsNotEmpty()
    payerId: string;
    
    @IsString()
    @IsNotEmpty()
    paymentSystem: string;
    
    @IsString()
    @IsNotEmpty()  
    paymentMethod: string;
    
    @IsNumber()
    @IsNotEmpty() 
    amount: number;
    
    @IsString()
    @IsNotEmpty() 
    currency: string;
    
    @IsOptional() 
    comment: string | null;
}

export class Payment extends CreatePaymentDTO{
    static createdStatus: string = 'created';
    static approvedStatus: string = 'approved';
    static canceledStatus: string = 'canceled';

    id: string;
    created: Date;
    updated: Date;
    status: string;

    constructor(
        createdPayment: CreatePaymentDTO,
    ) {
        super();
        this.id = uuidv4();
        this.payeeId = createdPayment.payeeId;
        this.payerId = createdPayment.payerId;
        this.paymentSystem = createdPayment.paymentSystem;
        this.paymentMethod = createdPayment.paymentMethod;
        this.amount = createdPayment.amount;
        this.currency = createdPayment.currency;
        this.status = Payment.createdStatus;
        this.comment = createdPayment.comment ?? null;
        this.created = new Date();
        this.updated = new Date();

    }
}
