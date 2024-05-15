import { CategoriesRepository } from "../../shared/categories-repository"
import { UseCase } from "../../shared/use-case"
import { CategoryAlreadyExists } from "./errors/category-already-exists"
import { Category } from "../model/category"

type CategoryRequest = {
  name: string
}

export class CreateCategory implements UseCase<CategoryRequest, Category> {
  constructor(private readonly repo: CategoriesRepository) {}

  async execute(category: CategoryRequest): Promise<Category> {
    const { name } = category

    const categoryFound = await this.repo.findCategoryByName(name)

    if (categoryFound) {
      throw new CategoryAlreadyExists()
    }

    const newCategory = await this.repo.createCategory(name)

    return newCategory
  }
}
