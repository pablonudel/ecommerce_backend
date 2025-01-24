# Backend Store

This project is a backend for an e-commerce store developed with **ExpressJS**, **MongoDB**, and documented using **Swagger**. The system allows managing users, products, shopping carts, and purchase orders, with different roles and permissions for each type of user.

## Roles and Permissions

#### SUPERADMIN

- **CRUD Users**: The only role that can assign `admin` and `user` roles.
- **CRUD Products**: Can add, modify, and delete products.
- **View Orders**: Can view all generated orders.
- **Modify Order Status**: Can change the status of orders.

#### ADMIN

- **CRUD Products**: Can add, modify, and delete products.
- **View Orders**: Can view all generated orders.
- **Modify Order Status**: Can change the status of orders.

#### USER

- **View Products**: Can view all available products.
- **Modify Profile and Add Avatar**: Can update their profile and upload an avatar image.
- **Delete Account**: Can delete their own account.
- **Modify Cart**: Can add, modify, and remove products in their cart.
- **Generate and View Orders**: Can generate purchase orders and view their previous orders.

#### UNREGISTERED USER

- **View Products**: Can view all available products.
- **Register**: Can register to become a registered user.

## Dependencies

| Dependency                                                             | Version     | Description                                         |
| ---------------------------------------------------------------------- | ----------- | --------------------------------------------------- |
| [bcrypt](https://www.npmjs.com/package/bcrypt)                         | 5.0.1       | For password hashing.                               |
| [connect-mongo](https://www.npmjs.com/package/connect-mongo)           | 4.6.0       | For storing sessions in MongoDB.                    |
| [dotenv](https://www.npmjs.com/package/dotenv)                         | 16.0.1      | For managing environment variables.                 |
| [express](https://www.npmjs.com/package/express)                       | 4.18.2      | Framework for building web applications in Node.js. |
| [express-session](https://www.npmjs.com/package/express-session)       | 1.17.3      | For managing sessions in Express.                   |
| [mongoose](https://www.npmjs.com/package/mongoose)                     | 6.5.3       | For modeling MongoDB objects.                       |
| [multer](https://www.npmjs.com/package/multer)                         | 1.4.5-lts.1 | For handling file uploads.                          |
| [nodemailer](https://www.npmjs.com/package/nodemailer)                 | 6.8.0       | For sending emails.                                 |
| [passport](https://www.npmjs.com/package/passport)                     | 0.6.0       | For user authentication.                            |
| [passport-local](https://www.npmjs.com/package/passport-local)         | 1.0.0       | Local authentication strategy with Passport.        |
| [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)           | 6.2.5       | For generating API documentation with Swagger.      |
| [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) | 4.6.0       | For serving the Swagger UI interface.               |
| [winston](https://www.npmjs.com/package/winston)                       | 3.8.2       | For logging.                                        |

## API Documentation

The API is fully documented using **Swagger**. You can access the Swagger UI by running the server and navigating to:

`http://localhost:<PORT>/api-docs`

Replace `<PORT>` with the port number your server is running on (default is `8080`).

## Getting Started

#### PREREQUISITES

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- NPM (Node Package Manager)

#### INSTALLATION

**1. Clone the repository**

```bash
git clone https://github.com/pablonudel/ecommerce_backend.git
```

**2. Navigate to the project directory**

```bash
cd ecommerce_backend
```

**3. Install dependencies**

```bash
npm install
```

**4. Create a `.env` file in the root directory and add the following environment variables**

```
MONGO_URL=<your-mongodb-connection-string>
MONGO_DB=<your-database-name>
SESSION_KEY=<your-session-secret-key>
ADMIN_EMAIL=<admin-email>
ADMIN_PASSWORD=<admin-password>
ADMIN_USER=<admin-user-json>
NODEMAILER_EMAIL=<your-email>
NODEMAILER_PASSWORD=<your-email-password>
```

**5. Start the server**

```
npm run dev
```

## Features

- **User Authentication:** Register, login, and logout functionality with Passport.js.
- **Role-Based Access Control:** Different permissions for SuperAdmin, Admin, and User roles.
- **Product Management:** Add, update, delete, and view products
- **Shopping Cart:** Add, update, and remove products in the cart.
- **Order Management:** Generate and view orders, with email confirmation.
- **File Uploads:** Upload product images and user avatars using Multer.
- **Logging:** Logging system using Winston for errors, warnings, and info messages.
- **API Documentation:** Fully documented API using Swagger.

## Contact

If you have any questions or would like to get in touch, feel free to reach out:

Pablo Nudel - [GitHub Profile](https://github.com/pablonudel)
