import __dirname from '../utils.js'

export const swaggerOptions = {
    definition:{
        openapi:'3.0.1',
        info:{
            title:'API de Tienda',
            description: 'API del proyecto E-commerce de Coderhouse'
        }
    },
    apis:[`${__dirname}/docs/**/*.yaml`]
}