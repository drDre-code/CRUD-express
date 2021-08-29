
import { Info, writeDataToFile } from '../util';

let DATA: Info[]

try {
    DATA = require('../../database/data');
} catch (err) {
    console.log('No DataBase available');
}


export function findAllData(): Promise<Info[]> {
    return new Promise((resolve, reject) => {
        try {
            resolve(DATA);
        } catch (err) {
            reject(err);
        }

    })
}

export function findDataById(id: number): Promise<Info | undefined> {
    return new Promise((resolve, reject) => {
        if (!DATA) {
            DATA = []
        }
        const individualData = DATA.find((x: Info) => x.id === id)
        resolve(individualData)
    })
}

export function create(userData: Info): Promise<Info> {
    return new Promise((resolve, reject) => {
        if (!DATA) {
            DATA = []
        }
        const newData = { id: id(), ...userData }
        DATA.push(newData)
        writeDataToFile('./database/data.json', DATA)
        resolve(newData)
    })
}

export function update(id: number, userData: Info): Promise<Info | undefined> {
    return new Promise((resolve, reject) => {
        const index = DATA.findIndex((x: Info) => x.id === id)
        DATA[index] = { id, ...userData }
        writeDataToFile('./database/data.json', DATA)
        resolve(DATA[index])
    })
}

export function deleteUser(id: number): Promise<Info | null> {
    return new Promise((resolve, reject) => {
        DATA = DATA.filter((x: Info) => x.id !== id)
        writeDataToFile('./database/data.json', DATA)
        resolve(null)
    })
}






function id() {
    let id;
    if (DATA.length === 0) {
        id = 1
    } else {
        id = Number((DATA[DATA.length - 1]).id) + 1
    }
    return id
}