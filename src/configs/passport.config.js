import passport from 'passport'
import local from 'passport-local'
import {userService, cartService} from '../services/index.js'
import {hashPass, unhashPass} from '../utils/index.js'
import {config} from './config.js'

const LocalStrategy = local.Strategy
const userAdmin = config.SERVER.ADMIN.ADMINUSER


export const initPassport = () => {
    passport.use('register', new LocalStrategy({passReqToCallback:true, usernameField:'email'}, async(req, email, password, done)=>{
        try {
            const {name,lastname} = req.body
            if(!name || !lastname || !email || !password) return done(null, false)
            const exist = await userService.getBy({'email':email})
            if(exist) return done(null, false)
            const userCart =  await cartService.save({})
            const result = await userService.save({name,lastname,email,password:hashPass(password), cart:userCart._id})
            return done(null, result)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('login', new LocalStrategy({usernameField:'email'}, async( email, password, done)=>{
        try {
            if(!email || !password) return done(null, false)
            if(email===config.SERVER.ADMIN.EMAIL && password === config.SERVER.ADMIN.PASSWORD){
                return done(null, JSON.parse(userAdmin))
            }else{
            const user = await userService.getBy({email:email})
            if(!user) return done(null, false)
            if(!unhashPass(user,password)) return done(null, false)
            return done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done)=>{
        done(null,user._id)
    })
    passport.deserializeUser(async (id, done)=>{
        if(id==='admin'){
            return done(null, JSON.parse(userAdmin))
        }else{
        const result = await userService.getBy({_id:id})
        return done(null, result)
        }
    })
}