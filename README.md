# Backend Tienda
### Alumno: Pablo Nudel

### Descripción del proyecto
Proyecto de backend para una Tienda Ecommerce desarrollada con ExpressJS, MongoDB y documentado con Swagger

ROLES Y AUTORIZACIONES:

SUPERADMIN
- AMB Usuarios, es el único que puede asignar Roles de admin y user
- AMB Productos
- Visualizar Órdenes
- Modificar el estado de una Orden

ADMIN
- AMB de Productos
- Visualizar Órdenes
- Modificar el estado de una Orden

USER
- Visualizar Productos
- Modificar sus datos
- Eliminar su cuenta
- Modificar su Carrito
- Generar y visualizar sus Órdenes

USUARIO NO REGISTRADO
- Visualizar Productos

A continuación las versiones de las dependencias instaladas y sus referencias

| Dependencia | Version |
| ------ | ------ |
| [bcrypt](https://www.npmjs.com/package/bcrypt) | 5.0.1 |
| [connect-mongo](https://www.npmjs.com/package/connect-mongo) | 4.6.0 |
| [dotenv](https://www.npmjs.com/package/dotenv) | 16.0.1 |
| [express](https://www.npmjs.com/package/express) | 4.18.2 |
| [express-session](https://www.npmjs.com/package/express-session) | 1.17.3 |
| [mongoose](https://www.npmjs.com/package/mongoose) | 6.5.3 |
| [multer](https://www.npmjs.com/package/multer) | 1.4.5-lts.1 |
| [nodemailer](https://www.npmjs.com/package/nodemailer) | 6.8.0 |
| [passport](https://www.npmjs.com/package/passport) | 0.6.0 |
| [passport-local](https://www.npmjs.com/package/passport-local) | 1.0.0 |
| [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) | 6.2.5 |
| [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) | 4.6.0 |
| [winston](https://www.npmjs.com/package/winston) | 3.8.2 |