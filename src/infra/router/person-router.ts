import { PersonController } from "../controller/person-controller"
import { Router } from "express"
import { validateRequest } from "../controller/util/validate-request"
import { createPersonBody, deletePersonParams, editPersonBody, editPersonParams, getPersonParams } from "@gen/validation"


export function personRouter(controller: PersonController) {
    const router = Router()
    
    router.get('/', controller.getAll)
    router.get('/:id', validateRequest({ params: getPersonParams }), controller.getById)
    router.post('/:id', validateRequest({ body: createPersonBody }), controller.create)
    router.patch(
        '/:id', 
        validateRequest({ params: editPersonParams, body: editPersonBody }), 
        controller.update
    )
    router.delete('/:id', validateRequest({ params: deletePersonParams }), controller.delete)

    return router
}

