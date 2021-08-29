"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDataToFile = void 0;
const fs_1 = __importDefault(require("fs"));
async function writeDataToFile(filePath, data) {
    fs_1.default.writeFile(filePath, JSON.stringify(data, null, ' '), 'utf8', (err) => {
        if (err) {
            console.log(err);
        }
    });
}
exports.writeDataToFile = writeDataToFile;
//# sourceMappingURL=util.js.map