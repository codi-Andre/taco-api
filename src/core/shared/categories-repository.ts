import { Category } from "../category/model/category"

export interface CategoriesRepository {
  findCategoryByName(name: string): Promise<Category | null>
  createCategory(name: string): Promise<Category>
}
