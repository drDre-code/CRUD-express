import fs from 'fs';
import { IncomingMessage } from 'http';
export interface Info {
    [key: string]: string | number | string[]
}


export async function writeDataToFile(filePath: string, data: Info[]) {

    fs.writeFile(filePath, JSON.stringify(data, null, ' '), 'utf8', (err: unknown) => {
        if (err) {
            console.log(err)
        }
    })

}
