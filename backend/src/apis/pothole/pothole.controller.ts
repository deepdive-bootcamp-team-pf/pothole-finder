import express, { Application } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import {indexRoute} from './pothole.route'
import { potholeRoute} from './pothole.route';
//create class that creates app and instantiates the server
export class App {
    app: Application;

    constructor (
        private port?: number | string
    ) {
        this.app = express()
        this.settings()
        this.middlewares()
        this.routes()
    }
    //private method that sets the port to the server
    public settings () : void {
        this.app.set('port', this.port || process.env.PORT || 4200)
    }
    //private method for setting up middleware to handle json responses
    private middlewares () :void {
        this.app.use(morgan('dev'))
        this.app.use(express.json())
        this.app.use(helmet())
    }
    //private method for setting up routes that perform actions on pothole
    private routes () :void {
        this.app.use('/apis', indexRoute)
        this.app.use('/apis/pothole', potholeRoute)
    }
    //starts the server and tells the terminal to post a message of servers port and status
    public async listen (): Promise<void> {
        await this.app.listen(this.app.get('port'))
        console.log('Express app built successfully')

    }}

