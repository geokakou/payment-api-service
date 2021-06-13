import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreatePaymentDTO, Payment } from './dto/payment.dto';
import { PaymentsService } from './payments.service';

@UseGuards(JwtAuthGuard)
@Controller('v1/payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @Get()
    async getAllPayments(): Promise<Payment[]>{
        return this.paymentsService.getPayments();
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async createPayment(@Body() createPaymentDTO: CreatePaymentDTO): Promise<Payment>{
        return this.paymentsService.createPayment(createPaymentDTO);
    }

    @Get(':id')
    async getPayment(@Param('id', new ParseUUIDPipe()) id: string): Promise<Payment>{
        return this.paymentsService.getPayment(id);
    }

    @Put(':id/approve')
    async approvePayment(@Param('id', new ParseUUIDPipe()) id: string): Promise<void>{
        this.paymentsService.approve(id);
    }

    @Put(':id/cancel')
    async cancelPayment(@Param('id', new ParseUUIDPipe()) id: string): Promise<void>{
        this.paymentsService.cancel(id);
    }
}
