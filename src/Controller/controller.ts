import { Request, Response } from 'express';
import { findAllData, findDataById, create, update, deleteUser } from '../Model/model';
import { Info } from '../util'




export async function getAllData(req: Request, res: Response) {
    const data = await findAllData()
    if (data) {
        res.writeHead(200, { 'content-type': "application/json" })
        res.end(JSON.stringify(data));
    } else {
        res.writeHead(404, { 'content-type': "application/json" })
        res.end(JSON.stringify({ message: 'Page Not Found' }));
    }
}

export async function getDataById(req: Request, res: Response) {
    const id = +req.params.id;
    const data = await findDataById(id)
    if (data) {
        res.writeHead(200, { 'content-type': "application/json" })
        res.end(JSON.stringify(data));
    } else {
        res.writeHead(404, { 'content-type': "application/json" })
        res.end(JSON.stringify({ message: 'User Not Found' }));
    }
}

export async function createData(req: Request, res: Response) {
    
    const { organization, products, marketValue, address, ceo, country, noOfEmployees, employees } = req.body
    const user: Info = {
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
    }

    const newData = await create(user)

    res.writeHead(201, { 'content-type': "application/json" })
    return res.end(JSON.stringify(newData));
}

export async function updateData(req: Request, res: Response) {
    const id = +req.params.id;
    const data = await findDataById(id)
    if (data) {
        const { organization, products, marketValue, address, ceo, country, noOfEmployees, employees } = req.body
        const user: Info = {
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
        }

        const updatedData = await update(id, user)
        res.writeHead(201, { 'content-type': "application/json" })
        res.end(JSON.stringify(updatedData));
    } else {
        res.writeHead(404, { 'content-type': "application/json" })
        res.end(JSON.stringify({ message: 'User Not Found' }));
    }
}

export async function deleteData(req: Request, res: Response) {
    const id = +req.params.id;
    const data = await findDataById(id)
    if (data) {
        await deleteUser(id)
        res.writeHead(200, { 'content-type': "application/json" })
        res.end(JSON.stringify({ message:`User ${id} deleted`}));
    } else {
        res.writeHead(404, { 'content-type': "application/json" })
        res.end(JSON.stringify({ message: 'User Not Found' }));
    }
}