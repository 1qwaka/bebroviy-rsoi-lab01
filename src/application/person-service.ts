import { CreatePersonParams, IPersonRepository, PersonEntity, UpdatePersonParams } from "@domain";

export class PersonService {
    
    constructor(private readonly repo: IPersonRepository) {

    }

    public async getById(id: number): Promise<PersonEntity> {
        return this.repo.getById(id);
    }
    
    public async getAll(): Promise<PersonEntity[]> {
        return this.repo.getAll();
    }
    
    public async create(params: CreatePersonParams): Promise<PersonEntity> {
        return this.repo.create(params);
    }
    
    public async update(params: UpdatePersonParams): Promise<PersonEntity> {
        return this.repo.update(params);
    }
    
    public async delete(id: number): Promise<void> {
        return this.repo.delete(id);
    }
}