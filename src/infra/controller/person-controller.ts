import { EntityNotFoundError, IPersonService } from "@domain";
import { createPersonBody, deletePersonParams, editPersonBody, editPersonParams, getPersonParams } from "@gen/validation";
import { ErrorResponse, PersonResponse } from "@gen/schemas";
import z from "zod";
import { BaseHandler } from "./models/base-handler";


export type GetAllHandler = BaseHandler<
    unknown,
    PersonResponse[] | ErrorResponse
>;

export type GetByIdHandler = BaseHandler<
    z.infer<typeof getPersonParams>,
    PersonResponse | ErrorResponse
>;

export type CreateHandler = BaseHandler<
    unknown,
    ErrorResponse,
    z.infer<typeof createPersonBody>
>;

export type UpdateHandler = BaseHandler<
    z.infer<typeof editPersonParams>,
    PersonResponse | ErrorResponse,
    z.infer<typeof editPersonBody>
>;

export type DeleteHandler = BaseHandler<
    z.infer<typeof deletePersonParams>,
    ErrorResponse
>;


export class PersonController {

    constructor(private readonly service: IPersonService) {

    }

    public readonly getAll: GetAllHandler = async (req, res) => {
        try {
            const persons = await this.service.getAll();
            res.json(persons)
        } catch (e: unknown) {
            res.status(500).json({ message: 'Internal Error' })
        }
    }

    public readonly getById: GetByIdHandler = async (req, res) => {
        try {
            const person = await this.service.getById(req.params.id);
            res.json(person)
        } catch (e: unknown) {
            if (e instanceof EntityNotFoundError) {
                res.status(404).json({ message: e.message })
            } else {
                res.status(500).json({ message: 'Internal Error' })
            }
        }
    }

    public readonly create: CreateHandler = async (req, res) => {
        try {
            const person = await this.service.create(req.body);
            res.status(201).header('Location', person.id.toString()).send();
        } catch (e: unknown) {
            res.status(500).json({ message: 'Internal Error' })
        }
    };

    public readonly update: UpdateHandler = async (req, res) => {
        try {
            const person = await this.service.update({ ...req.params, ...req.body });
            res.json(person)
        } catch (e: unknown) {
            if (e instanceof EntityNotFoundError) {
                res.status(404).json({ message: e.message })
            } else {
                res.status(500).json({ message: 'Internal Error' })
            }
        }
    };

    public readonly delete: DeleteHandler = async (req, res) => {
        try {
            await this.service.delete(req.params.id);
            res.status(204).send();
        } catch (e: unknown) {
            res.status(500).json({ message: 'Internal Error' })
        }
    };
}
