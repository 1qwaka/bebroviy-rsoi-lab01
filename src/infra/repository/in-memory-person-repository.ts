import { CreatePersonParams, IPersonRepository, PersonEntity, UpdatePersonParams } from '@domain'
import { EntityNotFoundError } from '@domain';


export class InMemoryPersonRepository implements IPersonRepository {
    private persons: PersonEntity[] = [];

    public async create(params: CreatePersonParams): Promise<PersonEntity> {
        const nextId = this.persons.reduce((id, person) => id > person.id ? id : person.id, 0)
        const person = {
            ...params,
            id: nextId
        }
        this.persons.push(person)
        return person;
    }

    public async delete(id: number): Promise<void> {
        const idx = this.persons.findIndex(p => p.id === id);
        if (idx === -1) {
            throw new EntityNotFoundError('Person', id)
        }
        this.persons.splice(idx)
    }

    public async getAll(): Promise<PersonEntity[]> {
        return this.persons;
    }

    public async getById(id: number): Promise<PersonEntity> {
        const person = this.persons.find(p => p.id === id);
        if (!person) {
            throw new EntityNotFoundError('Person', id)
        }
        return person;
    }

    public async update(params: UpdatePersonParams): Promise<PersonEntity> {
        const idx = this.persons.findIndex(p => p.id === params.id);
        if (idx === -1) {
            throw new EntityNotFoundError('Person', params.id)
        }
        this.persons[idx] = {
            ...this.persons[idx],
            ...params
        }

        return this.persons[idx];
    }
}