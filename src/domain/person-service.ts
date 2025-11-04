import { CreatePersonParams, PersonEntity, UpdatePersonParams } from "domain/person-entity";

export interface IPersonService {
    getById(id: number): Promise<PersonEntity>;
    
    getAll(): Promise<PersonEntity[]>;
    
    create(params: CreatePersonParams): Promise<PersonEntity>;
    
    update(params: UpdatePersonParams): Promise<PersonEntity>;
    
    delete(id: number): Promise<void>;
}