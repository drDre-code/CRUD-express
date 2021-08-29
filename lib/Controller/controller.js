"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteData = exports.updateData = exports.createData = exports.getDataById = exports.getAllData = void 0;
const model_1 = require("../Model/model");
async function getAllData(req, res) {
    const data = await model_1.findAllData();
    if (data) {
        res.writeHead(200, { 'content-type': "application/json" });
        res.end(JSON.stringify(data));
    }
    else {
        res.writeHead(404, { 'content-type': "application/json" });
        res.end(JSON.stringify({ message: 'Page Not Found' }));
    }
}
exports.getAllData = getAllData;
async function getDataById(req, res) {
    const id = +req.params.id;
    const data = await model_1.findDataById(id);
    if (data) {
        res.writeHead(200, { 'content-type': "application/json" });
        res.end(JSON.stringify(data));
    }
    else {
        res.writeHead(404, { 'content-type': "application/json" });
        res.end(JSON.stringify({ message: 'User Not Found' }));
    }
}
exports.getDataById = getDataById;
async function createData(req, res) {
    const { organization, products, marketValue, address, ceo, country, noOfEmployees, employees } = req.body;
    const user = {
        organization,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        products,
        marketValue,
        address,
        ceo,
        country,
        noOfEmployees,
        employees
    };
    const newData = await model_1.create(user);
    res.writeHead(201, { 'content-type': "application/json" });
    return res.end(JSON.stringify(newData));
}
exports.createData = createData;
async function updateData(req, res) {
    const id = +req.params.id;
    const data = await model_1.findDataById(id);
    if (data) {
        const { organization, products, marketValue, address, ceo, country, noOfEmployees, employees } = req.body;
        const user = {
            organization: organization || data.organization,
            createdAt: data.createdAt,
            updatedAt: new Date().toISOString(),
            products: products || data.products,
            marketValue: marketValue || data.marketValue,
            address: address || data.address,
            ceo: ceo || data.ceo,
            country: country || data.country,
            noOfEmployees: noOfEmployees || data.noOfEmployees,
            employees: employees || data.employees
        };
        const updatedData = await model_1.update(id, user);
        res.writeHead(201, { 'content-type': "application/json" });
        res.end(JSON.stringify(updatedData));
    }
    else {
        res.writeHead(404, { 'content-type': "application/json" });
        res.end(JSON.stringify({ message: 'User Not Found' }));
    }
}
exports.updateData = updateData;
async function deleteData(req, res) {
    const id = +req.params.id;
    const data = await model_1.findDataById(id);
    if (data) {
        await model_1.deleteUser(id);
        res.writeHead(200, { 'content-type': "application/json" });
        res.end(JSON.stringify({ message: `User ${id} deleted` }));
    }
    else {
        res.writeHead(404, { 'content-type': "application/json" });
        res.end(JSON.stringify({ message: 'User Not Found' }));
    }
}
exports.deleteData = deleteData;
//# sourceMappingURL=controller.js.map