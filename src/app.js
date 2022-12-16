import express from 'express'
import session from 'express-session'
import passport from 'passport'
import MongoStore from 'connect-mongo'
import __dirname from './utils.js'
import { config, initPassport, swaggerOptions } from './configs/index.js'
import { middleware } from './middlewares/index.js'
import {sessionsRouter, usersRouter, cartRouter, productsRouter, ordersRouter} from './routes/index.js'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

const app = express()

const specs = swaggerJsdoc(swaggerOptions)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(middleware.logger)
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use(session({
    store: MongoStore.create({
        mongoUrl:config.MONGO_DB.URL,
        dbName:config.MONGO_DB.DB_NAME,
        mongoOptions:{useNewUrlParser:true, useUnifiedTopology:true},
        ttl:6000
    }),
    secret:config.SERVER.SESSION.SECRET_KEY,
    resave:false,
    saveUninitialized:false,
}))



initPassport()
app.use(passport.initialize())
app.use(passport.session())


app.use(config.SERVER.ROUTES.SESSIONS, sessionsRouter)
app.use(config.SERVER.ROUTES.USERS, usersRouter)
app.use(config.SERVER.ROUTES.CARTS, cartRouter)
app.use(config.SERVER.ROUTES.PRODUCTS, productsRouter)
app.use(config.SERVER.ROUTES.ORDERS, ordersRouter)

/** Server Init */
const server = app.listen(config.SERVER.PORT, ()=>{
    console.log(`Server listening on http://localhost:${config.SERVER.PORT}`)
})
server.on('error', error => console.log(`Server error: ${error}`))