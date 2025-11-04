import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PrismaPersonRepository } from '../prisma-person-repository';
import { PrismaClient, Prisma } from '@gen/prisma/client';
import { EntityNotFoundError, CreatePersonParams, UpdatePersonParams } from '@domain';
import { nullToUndefined } from 'shared/null-to-undefined';

vi.mock('shared/null-to-undefined', () => ({
    nullToUndefined: (x: any) => x
}));

describe('PrismaPersonRepository', () => {
    let repo: PrismaPersonRepository;
    let mockPrisma: Partial<PrismaClient>;

    beforeEach(() => {
        mockPrisma = {
            person: {
                findMany: vi.fn(),
                findFirst: vi.fn(),
                create: vi.fn(),
                update: vi.fn(),
                delete: vi.fn(),
            } as any,
        };
        repo = new PrismaPersonRepository(mockPrisma as PrismaClient);
    });

    it('getAll возвращает всех пользователей', async () => {
        const data = [{ id: 1, name: 'Bober' }];
        (mockPrisma.person!.findMany as any).mockResolvedValue(data);

        const result = await repo.getAll();
        expect(result).toEqual(data);
        expect(mockPrisma.person!.findMany).toHaveBeenCalled();
    });

    it('getById возвращает пользователя если найден', async () => {
        const person = { id: 1, name: 'Bober' };
        (mockPrisma.person!.findFirst as any).mockResolvedValue(person);

        const result = await repo.getById(1);
        expect(result).toEqual(person);
        expect(mockPrisma.person!.findFirst).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('getById выбрасывает EntityNotFoundError если пользователь не найден', async () => {
        (mockPrisma.person!.findFirst as any).mockResolvedValue(null);

        await expect(repo.getById(1)).rejects.toBeInstanceOf(EntityNotFoundError);
    });

    it('create создаёт пользователя', async () => {
        const params: CreatePersonParams = { name: 'Kurwa' };
        const created = { id: 1, ...params };
        (mockPrisma.person!.create as any).mockResolvedValue(created);

        const result = await repo.create(params);
        expect(result).toEqual(created);
        expect(mockPrisma.person!.create).toHaveBeenCalledWith({ data: params });
    });

    it('update обновляет пользователя', async () => {
        const params: UpdatePersonParams = { id: 1, name: 'Bober Updated' };
        const updated = { ...params };
        (mockPrisma.person!.update as any).mockResolvedValue(updated);

        const result = await repo.update(params);
        expect(result).toEqual(updated);
        expect(mockPrisma.person!.update).toHaveBeenCalledWith({ data: params, where: { id: 1 } });
    });

    it('update выбрасывает EntityNotFoundError если не найден', async () => {
        const params: UpdatePersonParams = { id: 1, name: 'Bober Updated' };
        const err = new Prisma.PrismaClientKnownRequestError(
            'Not found',
            { code: 'P2025', clientVersion: '0.0.0' }
        );
        (mockPrisma.person!.update as any).mockRejectedValue(err);

        await expect(repo.update(params)).rejects.toBeInstanceOf(EntityNotFoundError);
    });

    it('delete удаляет пользователя', async () => {
        (mockPrisma.person!.delete as any).mockResolvedValue({});

        await repo.delete(1);
        expect(mockPrisma.person!.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('delete выбрасывает EntityNotFoundError если не найден', async () => {
        const err = new Prisma.PrismaClientKnownRequestError(
            'Not found',
            { code: 'P2025', clientVersion: '0.0.0' }
        );
        (mockPrisma.person!.delete as any).mockRejectedValue(err);

        await expect(repo.delete(1)).rejects.toBeInstanceOf(EntityNotFoundError);
    });
});
