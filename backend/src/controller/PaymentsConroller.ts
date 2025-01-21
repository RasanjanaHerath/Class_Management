import { Request, Response } from 'express';
import { User } from '../entity/User';
import { Payment } from '../entity/Payment';
import { ClassCard } from '../entity/ClassCard';
import { AppDataSource } from '../data-source';
import { createHash } from 'crypto';
import { Class } from '../entity/Class';


export class PaymentController {
    static initiatePayment = async (req: Request, res: Response) => {
        try {
            // Get the user from request (assuming you have authentication middleware)
            const userId = req.user?.userId;

            // Get enrollment details
            const classCardRepository = AppDataSource.getRepository(ClassCard);
            const classCard = await classCardRepository.findOne({
                where: { id: parseInt(req.params.id) },
                relations: {
                    classObject: true,
                    student: true  // if you need student data too
                }
            });


       
            const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId } });
            const student = classCard.student;
           
            const classData = await AppDataSource.getRepository(Class).findOne({ where: { id: classCard.classObject.id } });
            // Generate hash
            const appId =process.env.APP_ID;
            const merchantSecret = process.env.MERCHANT_SECRET;
            const currency = "USD";
            const amount = classData.feePerMonth;
            const orderId = `ORDER_${new Date().getTime()}`;

          
            const hashSource = `${appId}${orderId}${amount}${currency}${createHash('md5').update(merchantSecret).digest('hex').toUpperCase()}`;
            const hashValue = createHash('md5').update(hashSource).digest('hex').toUpperCase();

    

            // Prepare payment payload
            const payload = {
                merchant_id: appId,
                return_url: `${process.env.CLIENT_URL}/courses/`,
                cancel_url: `${process.env.CLIENT_URL}/courses/`,
                notify_url: `${process.env.CLIENT_URL}/api/payments/notify`,
                order_id: orderId,
                items: "Course Enrollment",
                currency: currency,
                amount: 100,
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email,
                address: "Student Address", // You might want to add this to user model
                city: "Student City", // You might want to add this to user model
                country: "Sri Lanka",
                hash: hashValue,
                custom_1: userId,
                custom_2: student.id,
            };

        
            

            return res.status(200).json({
                payload
            });

        } catch (error) {
            console.error('Payment initiation error:', error);
            return res.status(500).json({
                message: 'Failed to initiate payment',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}