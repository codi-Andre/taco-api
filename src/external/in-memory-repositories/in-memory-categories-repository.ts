import { Category } from "../../core/category/model/category"
import { CategoriesRepository } from "../../core/shared/categories-repository"

export class InMemoryCategoriesRepository implements CategoriesRepository {
  private readonly categories: Category[] = []

  async findCategoryByName(name: string): Promise<Category | null> {
    const categoryFound = this.categories.find(
      (category) => category.name === name
    )

    if (!categoryFound) {
      return null
    }

    return categoryFound
  }

  async createCategory(name: string): Promise<Category> {
    const id = this.categories.at(-1)?.id ?? 1

    const newCategory = {
      id,
      name,
    }

    this.categories.push(newCategory)

    return newCategory
  }
}
