import { Router } from 'express';
import * as TicketController from '../controllers/ticket.controller';

const router = Router();

router.post('/', TicketController.createTicket);

export default router;
