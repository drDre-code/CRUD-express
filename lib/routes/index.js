"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const controller_1 = require("../Controller/controller");
const router = express_1.default.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.send(`
    <h1> DRE-API</h1> 
    <div>information: use "/api" to view database</div> 
    <div><a href=https://documenter.getpostman.com/view/16998071/Tzz4QJrJ>documentationLink</a></div>`);
});
router.get('/api', controller_1.getAllData);
router.get('/api/:id', controller_1.getDataById);
router.post('/api', controller_1.createData);
router.put('/api/:id', controller_1.updateData);
router.delete('/api/:id', controller_1.deleteData);
module.exports = router;
//# sourceMappingURL=index.js.map