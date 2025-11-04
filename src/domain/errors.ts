export class BebroviyError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class EntityNotFoundError extends BebroviyError {
    constructor(entityName: string, id?: string | number) {
        super(id
                ? `${entityName} with id ${id} not found`
                : `${entityName} not found`)
    }
}
