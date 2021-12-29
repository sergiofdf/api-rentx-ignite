import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test",
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCretaed = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCretaed).toHaveProperty("id");
  });

  it("should not be able to create a new category with existing name", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test",
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    await expect(
      createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
    ).rejects.toEqual(new AppError("Caregory already exists!"));
  });
});
