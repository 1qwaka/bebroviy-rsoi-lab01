

export interface PersonEntity {
    readonly id: number,
    readonly name: string,
    readonly age?: number,
    readonly address?: string,
    readonly work?: string,
}

export type CreatePersonParams = Omit<PersonEntity, 'id'>;

export type UpdatePersonParams = Pick<PersonEntity, 'id'> & Partial<Omit<PersonEntity, 'id'>>
