import express, { Application } from 'express';
import userRoutes from '../routes/user';

import morgan from 'morgan';
import cors from 'cors';

import db from '../db/connection';

export class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users'
    };

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.app.use(morgan('dev'));
        
        //metodos iniciales
        this.dbConnection();
        this.middlewares();
        // Definir mis rutas
        this.routes();

    }

    //TODO conectar base de datos
    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (err: unknown) {
            if (err instanceof Error) {
                // ✅ TypeScript knows err is Error
                console.log(err.message);
            } else {
                console.log('Unexpected error', err);
            }
        }

    }

    middlewares(){
        // configurar cors
        this.app.use( cors() );

        //lectura del body
        this.app.use( express.json() );

        // carpeta publica
        this.app.use( express.static('public'));
    }

    routes() {
        this.app.use( this.apiPaths.users, userRoutes );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ' + this.port );
        });
    }

}

export default Server;