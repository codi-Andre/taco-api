import { Category } from "../../core/category/model/category"
import { CategoriesRepository } from "../../core/shared/categories-repository"
import { DataBase } from "./database"

export class JsonCategoriesRepository implements CategoriesRepository {
  db: DataBase<Category>

  constructor(db: DataBase<unknown>) {
    this.db = db as DataBase<Category>
  }

  async findCategoryByName(name: string): Promise<Category | null> {
    const categories = this.db.select("categories")
    const categoryFound = categories.find((category) => category.name === name)

    if (!categoryFound) {
      return null
    }

    return categoryFound
  }

  async createCategory(name: string): Promise<Category> {
    const categories = this.db.select("categories")
    const id = categories.at(-1)?.id ?? 0

    const newCategory = {
      id: id + 1,
      name,
    }

    this.db.insert("categories", newCategory)

    return newCategory
  }
}
