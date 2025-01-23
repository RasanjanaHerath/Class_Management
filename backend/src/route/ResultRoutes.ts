import { Router } from 'express';
import { ResultController } from '../controller/ResultController';

const router = Router();

//get all results
router.get('/get-all', ResultController.getAllResults);

//get result by id
router.get('/get-by-id/:id', ResultController.getResultById);

//create result
router.post('/create', ResultController.createResult);

//update result
router.put('/update/:id', ResultController.updateResult);

//delete result
router.delete('/delete/:id', ResultController.deleteResult);

export default router;