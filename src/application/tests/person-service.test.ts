import { describe, it, expect, vi, beforeEach } from "vitest";
import { PersonService } from "../person-service";
import { PersonEntity } from "@domain";

describe("PersonService", () => {
  let service: PersonService;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      getById: vi.fn(),
      getAll: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    service = new PersonService(mockRepo);
  });

  it("должен вернуть пользователя по ID", async () => {
    const person: PersonEntity = { id: 1, name: "Bober" } as PersonEntity;
    mockRepo.getById.mockResolvedValue(person);

    const result = await service.getById(1);
    expect(result).toEqual(person);
    expect(mockRepo.getById).toHaveBeenCalledWith(1);
  });

  it("должен вернуть всех пользователей", async () => {
    const people: PersonEntity[] = [
      { id: 1, name: "Bober" } as PersonEntity,
      { id: 2, name: "Kurwa" } as PersonEntity,
    ];
    mockRepo.getAll.mockResolvedValue(people);

    const result = await service.getAll();
    expect(result).toEqual(people);
    expect(mockRepo.getAll).toHaveBeenCalled();
  });

  it("должен создать пользователя", async () => {
    const params = { name: "Charlie" };
    const person: PersonEntity = { id: 3, ...params } as PersonEntity;
    mockRepo.create.mockResolvedValue(person);

    const result = await service.create(params);
    expect(result).toEqual(person);
    expect(mockRepo.create).toHaveBeenCalledWith(params);
  });

  it("должен обновить пользователя", async () => {
    const params = { id: 1, name: "Bober Updated" };
    const person: PersonEntity = { ...params } as PersonEntity;
    mockRepo.update.mockResolvedValue(person);

    const result = await service.update(params);
    expect(result).toEqual(person);
    expect(mockRepo.update).toHaveBeenCalledWith(params);
  });

  it("должен удалить пользователя", async () => {
    mockRepo.delete.mockResolvedValue(undefined);

    await service.delete(1);
    expect(mockRepo.delete).toHaveBeenCalledWith(1);
  });
});
