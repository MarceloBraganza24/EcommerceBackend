import express from "express";
import handlebars from 'express-handlebars';
import { __mainDirname } from './utils/utils.js';
import initializePassport from "./config/passport.js";
import passport from "passport";
import { addLogger } from './utils/logger.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import config from "./config/config.js";

import ViewsRouter from "./routes/views.router.js";
import ProductsRouter from "./routes/products.router.js";
import CartsRouter from "./routes/carts.router.js";
import UsersRouter from "./routes/users.router.js";
import SessionsRouter from "./routes/sessions.router.js";
import TicketsRouter from "./routes/tickets.router.js";

const app = express();

const viewsRouter = new ViewsRouter();
const productsRouter = new ProductsRouter();
const cartsRouter = new CartsRouter();
const usersRouter = new UsersRouter();
const sessionsRouter = new SessionsRouter();
const ticketsRouter = new TicketsRouter();

app.use(addLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__mainDirname}/src/public`));
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

app.engine('handlebars', handlebars.engine());
app.set('views', `${__mainDirname}/src/views`);
app.set('view engine', 'handlebars');

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación del proyecto Ecommerce Curso Backend',
            description: 'API para resolver el proceso de compra de productos online'
        }
    },
    apis: [`${__mainDirname}/docs/**/*.yaml`]
}

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use('/', viewsRouter.getRouter());
app.use('/api/products', productsRouter.getRouter());
app.use('/api/carts', cartsRouter.getRouter());
app.use('/api/users', usersRouter.getRouter());
app.use('/api/sessions', sessionsRouter.getRouter());
app.use('/api/tickets', ticketsRouter.getRouter());

app.listen(config.port, () => console.log('Server running...'))