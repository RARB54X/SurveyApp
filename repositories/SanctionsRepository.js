import { useSQLiteContext } from "expo-sqlite/next";
import { SanctionsModel } from "../models/SanctionsModel";
export class SanctionsRepository {
  db;

  constructor(db = useSQLiteContext()) {
    this.db = db;
  }

  async create(sanction) {
    try {
      const lastInsertRowId = await new Promise((resolve, reject) => {
        this.db.withTransactionAsync(async () => {
          try {
            console.log("Insertando Sanciones...", sanction);

            // Consulta SQL para insertar en sanctions
            const response = await this.db.runAsync(
              `INSERT INTO sanctions (
                        respondent_id, reason, sanctioned_by, sanction_type, date, sanction_duration, structure
                      ) VALUES (?, ?, ?, ?, ?, ?, ?);`,
              [
                sanction.respondentId,
                sanction.reason,
                sanction.sanctionedBy,
                sanction.sanctionType,
                sanction.date,
                sanction.sanctionDuration,
                sanction.structure,
              ]
            );

            resolve(response.lastInsertRowId);
          } catch (error) {
            reject(error);
          }
        });
      });
      console.log("sanctions id insertado:", lastInsertRowId);
      return lastInsertRowId;
    } catch (error) {
      console.error("Error al insertar sanctions:", error.message);
    }
  }
  async update(sanction) {
    try {
      const response = await this.db.runAsync(
        `UPDATE sanctions SET 
            respondent_id = ?, 
            reason = ?, 
            sanctioned_by = ?, 
            sanction_type = ?, 
            date = ?, 
            sanction_duration = ?, 
            structure = ? 
        WHERE id = ?;`,
        [
          sanction.respondentId,
          sanction.reason,
          sanction.sanctionedBy,
          sanction.sanctionType,
          sanction.date,
          sanction.sanctionDuration,
          sanction.structure,
          sanction.id,
        ]
      );

      console.log("Actualización de sanción completada exitosamente.");

      return response.changes > 0;
    } catch (error) {
      console.error("Error al actualizar la sanción:", error.message);
    }
  }
  async findByRespondentId(respondentId) {
    try {
      const result = await this.db.getAllAsync(
        `SELECT * FROM sanctions WHERE respondent_id = ?;`,
        [respondentId]
      );
      if (!result?.length) {
        return [];
      }
      return result.map(SanctionsModel.fromObject);
    } catch (error) {
      console.error(
        "Error al obtener sanciones por ID de encuestado:",
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
        `SELECT * FROM sanctions WHERE id = ?;`,
        [id]
      );
      return SanctionsModel.fromObject(result);
    } catch (error) {
      console.error("Error al obtener sanción por ID:", error.message);
      return null;
    }
  }
  async delete(id) {
    try {
      await this.db.runAsync(`DELETE FROM sanctions WHERE id = ?;`, [id]);
      console.log("Sanción eliminada exitosamente.");
    } catch (error) {
      console.error("Error al eliminar sanción por ID:", error.message);
    }
  }
  async findAll() {
    try {
      return await this.db.getAllAsync(`SELECT * FROM sanctions`);
    } catch (error) {
      console.error("Error al obtener sanctions:", error.message);
    }
  }
}
