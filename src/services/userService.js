import User from '../models/User.js'

export class UserService {

    static async getUser(id) {
        try {
            console.log("getUser id: ", id)
            const user = await User.findById(id)
            return user
        } catch (error) {
            return error
        }
    }

    static async getUsers() {
        try {
            const users = await User.find()
            return users
        } catch (error) {
            return error
        }
    }

    static async createUser(userDTO) {
        console.log("createUser userDTO: ", userDTO)
        try {
            const user = new User({
                name: userDTO.user_name,
                email: userDTO.user_email,
                phone: userDTO.user_phone,
                rut: userDTO.user_rut
            })
            await user.save()
            return user
        } catch (error) {
            return error
        }
    }

    static async createUsers(usersDTO) {
        try {
            const users = usersDTO.map(userDTO => {
                const user = new User({
                    name: userDTO.user_name,
                    email: userDTO.user_email,
                    phone: userDTO.user_phone,
                    rut: userDTO.user_rut
                })
                return user
            })
            await User.insertMany(users)
            return users
        } catch (error) {
            return error
        }
    }

    mapUser(userDTO) {
        return {
            name: userDTO.user_name,
            email: userDTO.user_email,
            phone: userDTO.user_phone,
            rut: userDTO.user_rut
        }
    }

    mapUsers(usersDTO) {
        return usersDTO.map(userDTO => this.mapUser(userDTO))
    }

}