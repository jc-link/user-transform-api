
export class UserDTO {

    constructor({ user_rut, user_name, user_email, user_phone }) {
        this.user_rut = user_rut
        this.user_name = user_name
        this.user_email = user_email
        this.user_phone = user_phone
    }

    static fromModel(user) {
        return new UserDTO({
            user_rut: user.rut,
            user_name: user.name,
            user_email: user.email,
            user_phone: user.phone
        })
    }

    static fromRequest(body) {
        return new UserDTO({
            user_rut: body.user_rut,
            user_name: body.user_name,
            user_email: body.user_email,
            user_phone: body.user_phone
        })
    }

    static fromList(users) {
    }
}