"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.update = exports.create = exports.findDataById = exports.findAllData = void 0;
const util_1 = require("../util");
let DATA;
try {
    DATA = require('../../database/data');
}
catch (err) {
    console.log('No DataBase available');
}
function findAllData() {
    return new Promise((resolve, reject) => {
        try {
            resolve(DATA);
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.findAllData = findAllData;
function findDataById(id) {
    return new Promise((resolve, reject) => {
        if (!DATA) {
            DATA = [];
        }
        const individualData = DATA.find((x) => x.id === id);
        resolve(individualData);
    });
}
exports.findDataById = findDataById;
function create(userData) {
    return new Promise((resolve, reject) => {
        if (!DATA) {
            DATA = [];
        }
        const newData = { id: id(), ...userData };
        DATA.push(newData);
        util_1.writeDataToFile('./database/data.json', DATA);
        resolve(newData);
    });
}
exports.create = create;
function update(id, userData) {
    return new Promise((resolve, reject) => {
        const index = DATA.findIndex((x) => x.id === id);
        DATA[index] = { id, ...userData };
        util_1.writeDataToFile('./database/data.json', DATA);
        resolve(DATA[index]);
    });
}
exports.update = update;
function deleteUser(id) {
    return new Promise((resolve, reject) => {
        DATA = DATA.filter((x) => x.id !== id);
        util_1.writeDataToFile('./database/data.json', DATA);
        resolve(null);
    });
}
exports.deleteUser = deleteUser;
function id() {
    let id;
    if (DATA.length === 0) {
        id = 1;
    }
    else {
        id = Number((DATA[DATA.length - 1]).id) + 1;
    }
    return id;
}
//# sourceMappingURL=model.js.map