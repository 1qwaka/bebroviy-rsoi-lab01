import { PersonService } from "@application/person-service"
import { PrismaClient } from "@gen/prisma/client"
import { PersonController } from "@infra/controller/person-controller"
import { personRouter } from "@infra/controller/router/person-router"
import { InMemoryPersonRepository } from "@infra/repository/in-memory-person-repository"
import { PrismaPersonRepository } from "@infra/repository/prisma-person-repository"
import express from "express"


export function buildApp() {
    const app = express()
    
    app.use((req, res, next) => {
        console.log('request', req.originalUrl)
        next()
    })
    app.use(express.json())
    

    const repo = new PrismaPersonRepository(new PrismaClient());
    const service = new PersonService(repo);
    const controller = new PersonController(service);

    app.use('/api/v1/persons',  personRouter(controller))

    
    
    return app
}