import Elysia, { t } from "elysia"
import { CreateCategory } from "../../core/category/services/create-category"
import { CategoryAlreadyExists } from "../../core/category/services/errors/category-already-exists"

export class CreateCategoryController {
  constructor(
    private readonly server: Elysia,
    private readonly useCase: CreateCategory
  ) {
    server.post(
      "/categories",
      async ({ body, set }) => {
        try {
          const category = await useCase.execute(body)

          set.status = 201

          return category
        } catch (error) {
          if (error instanceof CategoryAlreadyExists) {
            set.status = 409
            return error.message
          }

          throw error
        }
      },
      {
        body: t.Object({
          name: t.String({ minLength: 3 }),
        }),
      }
    )
  }
}
