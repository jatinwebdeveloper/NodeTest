import { Request, Response, response } from 'express';
import { User } from '../interface/User';
import fs from "fs";

export async function createUser(req: Request, res: Response) {
    const _userAlreadyExist = _getData();
    const newUser: User = req.body;
    if (newUser.id == null || newUser.email == null || newUser.name == null) {
        return res.status(401).send({ error: true, msg: 'User data missing' })
    }
    const _exist = _userAlreadyExist.find((user: any) => user.email === newUser.email)
    if (_exist) {
        return res.status(409).send({ error: true, msg: 'email already exist' })
    }
    const _existingId = _userAlreadyExist.find((user: any) => user.id === newUser.id)
    if (_existingId) {
        return res.status(409).send({ error: true, msg: 'duplicate Id not allowed' })
    }
    _userAlreadyExist.push(newUser)
    _saveData(_userAlreadyExist);
    res.send({ success: true, msg: 'User added successfully' })
}

export async function getUser(req: Request, res: Response) {
    const _resultedData = _getData();
    let _newResult = _resultedData.find((user:any) => user.id === req.body.id)
    res.send({ success: true, msg: "Fetched Successfully", data: _newResult })
}
const _saveData = (data: any) => {
    const _dataToSend = JSON.stringify(data)
    fs.writeFileSync('src/database/db.json', _dataToSend)
}


const _getData = () => {
    const _dataToGet = fs.readFileSync('src/database/db.json', 'utf-8')
    return JSON.parse(_dataToGet);
}