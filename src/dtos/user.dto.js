export default class UserDto{
    constructor(user){
        this.id = user._id
        this.name = user.name
        this.lastname = user.lastname
        this.email = user.email
        this.avatar = user.avatar
        this.role = user.role
        this.cart = user.cart || null
    }
}