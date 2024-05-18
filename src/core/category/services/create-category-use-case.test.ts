import { beforeEach, describe, expect, it } from "bun:test"
import { InMemoryCategoriesRepository } from "../../../external/in-memory-repositories/in-memory-categories-repository"
import { CreateCategory } from "./create-category"
import { CategoryAlreadyExists } from "./errors/category-already-exists"

let categoriesRepo: InMemoryCategoriesRepository
let sut: CreateCategory

describe("Create category use case", () => {
  beforeEach(() => {
    categoriesRepo = new InMemoryCategoriesRepository()
    sut = new CreateCategory(categoriesRepo)
  })

  it("should be able to create a category", async () => {
    const name = "Cereais e derivados"

    const category = await sut.execute({ name })

    expect(category.id).toBeNumber()
    expect(category.name).toBe(name)
  })

  it("should not be able to create a category with the same name", async () => {
    const name = "carnes"

    await sut.execute({ name })

    expect(async () => await sut.execute({ name })).toThrowError(
      CategoryAlreadyExists
    )
  })
})
