import { useSQLiteContext } from "expo-sqlite/next";
import { SpecialtiesModel } from "../models/SpecialtiesModel";
export class SpecialtiesRepository {
  db;

  constructor(db = useSQLiteContext()) {
    this.db = db;
  }

  async create(specialty) {
    try {
      const lastInsertRowId = await new Promise((resolve, reject) => {
        this.db.withTransactionAsync(async () => {
          try {
            console.log("Insertando Especialidades...", specialty);

            // Consulta SQL para insertar en specialties
            const response = await this.db.runAsync(
              `INSERT INTO specialties (
                        respondent_id, specialty_type, duration, structure
                      ) VALUES (?, ?, ?, ?);`,
              [
                specialty.respondentId,
                specialty.specialtyType,
                specialty.duration,
                specialty.structure,
              ]
            );

            resolve(response.lastInsertRowId);
          } catch (error) {
            reject(error);
          }
        });
      });
      console.log("specialty id insertado:", lastInsertRowId);
      return lastInsertRowId;
    } catch (error) {
      console.error("Error al insertar specialty:", error.message);
    }
  }
  async update(specialty) {
    try {
      const response = await this.db.runAsync(
        `UPDATE specialties SET 
                specialty_type = ?, duration = ?, structure = ?
            WHERE id = ?;`,
        [
          specialty.specialtyType,
          specialty.duration,
          specialty.structure,
          specialty.id,
        ]
      );

      console.log("Actualización completada exitosamente.");

      return response.changes > 0;
    } catch (error) {
      console.error("Error al actualizar specialties:", error.message);
    }
  }
  async findByRespondentId(respondentId) {
    try {
      const result = await this.db.getAllAsync(
        `SELECT * FROM specialties WHERE respondent_id = ?;`,
        [respondentId]
      );
      if (!result?.length) {
        return [];
      }
      return result.map(SpecialtiesModel.fromObject);
    } catch (error) {
      console.error(
        "Error al obtener especialidades por ID de encuestado:",
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
        `SELECT * FROM specialties WHERE id = ?;`,
        [id]
      );
      return SpecialtiesModel.fromObject(result);
    } catch (error) {
      console.error("Error al obtener especialidad por ID:", error.message);
      return null;
    }
  }
  async delete(id) {
    try {
      await this.db.runAsync(`DELETE FROM specialties WHERE id = ?;`, [id]);
    } catch (error) {
      console.error("Error al eliminar especialidad por ID:", error.message);
    }
  }
  async findAll() {
    try {
      return await this.db.getAllAsync(`SELECT * FROM specialties`);
    } catch (error) {
      console.error("Error al obtener specialties:", error.message);
    }
  }
}
