import { Injectable } from '@nestjs/common';
import { PaymentCannotApprove, PaymentNotFound, PaymentCannotCancel } from 'src/request.exception';
import { CreatePaymentDTO, Payment } from './dto/payment.dto';

@Injectable()
export class PaymentsService {
    private payments: Payment[] = [];

    getPayments(){
        return [...this.payments];
    }

    createPayment(payment: CreatePaymentDTO){
        const newPayment: Payment = new Payment(payment);
        this.payments.push(newPayment);
        return {...newPayment};
    }

    getPayment(id: string){
        const payment = this.findPayment(id);
        return {...payment};
    }

    approve(id: string){
        const payment = this.findPayment(id);

        if (payment.status === Payment.canceledStatus){
            throw new PaymentCannotApprove();
        } else {
            payment.status = Payment.approvedStatus;
            payment.updated = new Date();
        }
        return true;
    }

    cancel(id: string){
        const payment = this.findPayment(id);
        if (payment.status === Payment.approvedStatus){
            throw new PaymentCannotCancel();
        } else {
            payment.status = Payment.canceledStatus;
            payment.updated = new Date();
        }
        return true;
    }

    private findPayment(id: string): Payment {
        const payment = this.payments.find(p => p.id === id);
        if (!payment) {
            throw new PaymentNotFound();
        }
        return payment;
    }
}
