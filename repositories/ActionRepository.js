import { ActionModel } from "../models/ActionModel";
import { useSQLiteContext } from "expo-sqlite/next";
export class ActionRepository {
  db;

  constructor(db = useSQLiteContext()) {
    this.db = db;
  }

  async create(action) {
    try {
      const lastInsertRowId = await new Promise((resolve, reject) => {
        this.db.withTransactionAsync(async () => {
          try {
            // Consulta SQL para insertar en action
            const response = await this.db.runAsync(
              `INSERT INTO action (
                        respondent_id, action_type, commanding_officer, year_of_completion, structure
                      ) VALUES (?, ?, ?, ?, ?);`,
              [
                action.respondentId,
                action.actionType,
                action.commandingOfficer,
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

      return lastInsertRowId;
    } catch (error) {
      console.error("Error al insertar action:", error.message);
    }
  }
  async update(action) {
    try {
      const response = await this.db.runAsync(
        `UPDATE action SET 
                action_type = ?, commanding_officer = ?, year_of_completion = ?, structure = ?
            WHERE id = ?;`,
        [
          action.actionType,
          action.commandingOfficer,
          action.yearOfCompletion,
          action.structure,
          action.id,
        ]
      );

      console.log("Actualización de acción completada exitosamente.");

      return response.changes > 0;
    } catch (error) {
      console.error("Error al actualizar action:", error.message);
    }
  }

  async findByRespondentId(respondentId) {
    try {
      const result = await this.db.getAllAsync(
        `SELECT * FROM action WHERE respondent_id = ?;`,
        [respondentId]
      );
      if (!result?.length) {
        return [];
      }
      return result.map(ActionModel.fromObject);
    } catch (error) {
      console.error(
        "Error al obtener action por ID de encuestado:",
        error.message
      );
      return [];
    }
  }

  async findById(id) {
    try {
      if (!id) {
        return null;
      }
      const result = await this.db.getFirstAsync(
        `SELECT * FROM action WHERE id = ?;`,
        [id]
      );
      return ActionModel.fromObject(result);
    } catch (error) {
      console.error("Error al obtener action por ID:", error.message);
      return null;
    }
  }

  async delete(id) {
    try {
      await this.db.runAsync(`DELETE FROM action WHERE id = ?;`, [id]);
    } catch (error) {
      console.error("Error al eliminar hermano por ID:", error.message);
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
