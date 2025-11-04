import { CreatePersonParams, EntityNotFoundError, IPersonRepository, PersonEntity, UpdatePersonParams } from '@domain'
import { Prisma, PrismaClient } from '@gen/prisma/client';
import { nullToUndefined } from 'shared/null-to-undefined';


export class PrismaPersonRepository implements IPersonRepository {

    constructor(private readonly prisma: PrismaClient) {

    }

    public async getAll(): Promise<PersonEntity[]> {
        const persons = await this.prisma.person.findMany()
        return nullToUndefined(persons);
    }

    public async getById(id: number): Promise<PersonEntity> {
        const person = await this.prisma.person.findFirst({ where: { id } })
        if (!person) {
            throw new EntityNotFoundError('Person', id)
        }
        return nullToUndefined(person);
    }

    public async create(data: CreatePersonParams): Promise<PersonEntity> {
        const person = await this.prisma.person.create({ data })
        return nullToUndefined(person)
    }

    public async delete(id: number): Promise<void> {
        try {
            await this.prisma.person.delete({ where: { id } })
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    throw new EntityNotFoundError('Person', id)
                }
            }
            throw e;
        }
    }

    public async update(data: UpdatePersonParams): Promise<PersonEntity> {
        try {
            const person = await this.prisma.person.update({ data, where: { id: data.id } })
            return nullToUndefined(person);
        } catch (e: any) {
            // if (e.constructor.name === Prisma.PrismaClientKnownRequestError.name) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    throw new EntityNotFoundError('Person', data.id)
                }
            }
            throw e;
        }
    }

}