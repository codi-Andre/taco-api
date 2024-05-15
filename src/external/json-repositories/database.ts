const databasePath = new URL("db.json", import.meta.url)

export class DataBase<T> {
  private database: Record<string, T[]> = {}

  constructor() {
    Bun.file(databasePath, { type: "application/json" })
      .json()
      .then((data) => (this.database = data))
      .catch(() => this.persist())
  }

  private persist() {
    Bun.write(databasePath, JSON.stringify(this.database))
  }

  select(table: string) {
    return this.database[table] ?? []
  }

  insert(table: string, data: T) {
    if (Array.isArray(this.database[table])) {
      this.database[table].push(data)
    } else {
      this.database[table] = [data]
    }

    this.persist()

    return data
  }
}
