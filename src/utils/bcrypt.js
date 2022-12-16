import bcrypt from "bcrypt"

/**Bcrypt implementation*/
export const hashPass = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10))
export const unhashPass = (user,password) => bcrypt.compareSync(password,user.password)