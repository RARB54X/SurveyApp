export class ActionRepository {
  db;

  constructor(db) {
    this.db = db;
  }

  async create(action) {
    try {
      const lastInsertRowId = await new Promise((resolve, reject) => {
        this.db.withTransactionAsync(async () => {
          try {
            console.log("Insertando Acción...", action);

            // Consulta SQL para insertar en action
            const response = await this.db.runAsync(
              `INSERT INTO action (
                        respondent_id, action_type, commanding_officer, year_of_completion, structure
                      ) VALUES (?, ?, ?, ?, ?);`,
              [
                action.respondentId,
                action.actionType,
                action.inCharge,
                action.yearOfCompletion,
                action.structure,
              ]
            );

            resolve(response.lastInsertRowId);
          } catch (error) {
            reject(error);
          }
        });
      });
      console.log("action id insertado:", lastInsertRowId);
      return lastInsertRowId;
    } catch (error) {
      console.error("Error al insertar action:", error.message);
    }
  }

  async findAll() {
    try {
      return await this.db.getAllAsync(`SELECT * FROM action`);
    } catch (error) {
      console.error("Error al obtener action:", error.message);
    }
  }
}
