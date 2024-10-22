import { Router } from 'express';
import type { Request, Response } from 'express';

import ticketRoutes from './ticket.routes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello, Nerds!',
  });
});

router.use('/support/ticket', ticketRoutes);

export default router;
