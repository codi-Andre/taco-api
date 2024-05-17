import { Elysia } from "elysia"
import { InMemoryCategoriesRepository } from "./external/in-memory-repositories/in-memory-categories-repository"
import { CreateCategoryController } from "./adapters/category-controllers/create-category-controller"
import { CreateCategory } from "./core/category/services/create-category"
import { DataBase } from "./external/json-repositories/database"
import { JsonCategoriesRepository } from "./external/json-repositories/json-categories-repository"

const app = new Elysia()

const db = new DataBase()

const categoryRepo = new JsonCategoriesRepository(db)
const createCategory = new CreateCategory(categoryRepo)
new CreateCategoryController(app, createCategory)

app.listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
