import { useSQLiteContext } from "expo-sqlite/next";
import { EducationModel } from "../models/EducationModel";
export class EducationRepository {
  db;

  constructor(db = useSQLiteContext()) {
    this.db = db;
  }

  async create(education) {
    try {
      const lastInsertRowId = await new Promise((resolve, reject) => {
        this.db.withTransactionAsync(async () => {
          try {
            console.log("Insertando Educación...", education);

            // Consulta SQL para insertar en education
            const response = await this.db.runAsync(
              `INSERT INTO education (
                        respondent_id, training_type, training_duration, year_of_completion, structure
                      ) VALUES (?, ?, ?, ?, ?);`,
              [
                education.respondentId,
                education.trainingType,
                education.trainingDuration,
                education.yearOfCompletion,
                education.structure,
              ]
            );

            resolve(response.lastInsertRowId);
          } catch (error) {
            reject(error);
          }
        });
      });
      console.log("education id insertado:", lastInsertRowId);
      return lastInsertRowId;
    } catch (error) {
      console.error("Error al insertar education:", error.message);
    }
  }

  async update(education) {
    try {
      const response = await this.db.runAsync(
        `UPDATE education SET 
                training_type = ?, training_duration = ?, year_of_completion = ?, structure = ?
            WHERE id = ?;`,
        [
          education.trainingType,
          education.trainingDuration,
          education.yearOfCompletion,
          education.structure,
          education.id,
        ]
      );

      console.log("Actualización de educación completada exitosamente.");

      return response.changes > 0;
    } catch (error) {
      console.error("Error al actualizar education:", error.message);
    }
  }
  async findByRespondentId(respondentId) {
    try {
      const result = await this.db.getAllAsync(
        `SELECT * FROM education WHERE respondent_id = ?;`,
        [respondentId]
      );
      if (!result?.length) {
        return [];
      }
      return result.map(EducationModel.fromObject);
    } catch (error) {
      console.error(
        "Error al obtener education por ID de encuestado:",
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
        `SELECT * FROM education WHERE id = ?;`,
        [id]
      );
      return EducationModel.fromObject(result);
    } catch (error) {
      console.error("Error al obtener education por ID:", error.message);
      return null;
    }
  }

  async delete(id) {
    try {
      await this.db.runAsync(`DELETE FROM education WHERE id = ?;`, [id]);
    } catch (error) {
      console.error("Error al eliminar education por ID:", error.message);
    }
  }
}
