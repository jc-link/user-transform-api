const express = require('express')
const multer = require('multer')
const xlsx = require('xlsx')
const { UserService } = require('../services/userService')
const { UserDTO } = require('../DTOs/UserDTO')
const logger = require('../config/logger')

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

router.get('/hello', (req, res) => {
    res.status(200).json({ message: 'Hello World' })
})

router.get('/', async (req, res) => {
    logger.info('GET /user')
   try {
    const users = await UserService.getUsers()
    res.status(200).json(users)
   } catch (error) {
    res.status(500).json({ message: error.message })
   }
})

router.post('/', async (req, res) => {
    logger.info('POST /user')
    try{
        const userDTO = UserDTO.fromRequest(req.body)
        const user = await UserService.createUser(userDTO)
        res.status(201).json({ message: 'User created', user })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
    
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    logger.info(`GET /user/${id}`)
    try {
        const user = await UserService.getUser(id)
        res.status(200).json(user)
    } catch (error) {
        logger.error(error)
        res.status(404).json({ message: 'User not found' })
    }

})

router.post('/load', upload.single('file'), async (req, res) => {
    logger.info('POST /user/load')
    const file = req.file
    if (!file) return res.status(400).json({ message: 'No file uploaded' })

    const workbook = xlsx.readFile(file.path)
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const data = xlsx.utils.sheet_to_json(sheet)

    try {
        const usersDTO = data.map(user => {
            const { rut, name, email, phone } = user
            return new UserDTO({
                user_rut: rut,
                user_name: name,
                user_email: email,
                user_phone: phone
            })
        })
        await UserService.createUsers()
        res.status(201).json({ message: 'Users created' })  
    } catch (error) {
        logger.error(error)
        res.status(500).json({ message: 'Error uploading file', error })
    }
})

module.exports = router