import express, { Request, Response, NextFunction } from 'express';

import { getAllData, getDataById, createData, updateData, deleteData } from '../Controller/controller';

const router = express.Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
    res.send(`
    <h1> DRE-API</h1> 
    <div>information: use "/api" to view database</div> 
    <div><a href=https://documenter.getpostman.com/view/16998071/Tzz4QJrJ>documentationLink</a></div>`);
});
router.get('/api', getAllData);
router.get('/api/:id', getDataById);
router.post('/api', createData);
router.put('/api/:id', updateData);
router.delete('/api/:id', deleteData);

export = router;
