import {Router} from "express";
import { PaymentController } from "../controller/PaymentsConroller";

const paymentRoutes = Router();

paymentRoutes.get("/initiate/:id", PaymentController.initiatePayment);



export default paymentRoutes;

