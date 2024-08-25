import { useSQLiteContext } from "expo-sqlite/next";
import { SiblingModel } from "../models/SiblingModel";
export class SiblingsRepository {
  db;

  constructor(db = useSQLiteContext()) {
    this.db = db;
  }

  async create(sibling) {
    try {
      const lastInsertRowId = await new Promise((resolve, reject) => {
        this.db.withTransactionAsync(async () => {
          try {
            console.log("Insertando hermano", sibling);

            // Consulta SQL para insertar en siblings
            const response = await this.db.runAsync(
              `INSERT INTO siblings (
                        respondent_id, name, age, occupation, education_level, residence_site, 
                        current_address, phone, spouse
                      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
              [
                sibling.respondentId,
                sibling.name,
                sibling.age,
                sibling.occupation,
                sibling.educationLevel,
                sibling.residenceSite,
                sibling.currentAddress,
                sibling.phone,
                sibling.spouse,
              ]
            );

            resolve(response.lastInsertRowId);
          } catch (error) {
            reject(error);
          }
        });
      });
      console.log("Siblings id insertado:", lastInsertRowId);
      return lastInsertRowId;
    } catch (error) {
      console.error("Error al insertar hermano:", error.message);
    }
  }

  async update(sibling) {
    try {
      const response = await this.db.runAsync(
        `UPDATE siblings SET 
                name = ?, age = ?, occupation = ?, education_level = ?, residence_site = ?, 
                current_address = ?, phone = ?, spouse = ?
            WHERE id = ?;`,
        [
          sibling.name,
          sibling.age,
          sibling.occupation,
          sibling.educationLevel,
          sibling.residenceSite,
          sibling.currentAddress,
          sibling.phone,
          sibling.spouse,
          sibling.id,
        ]
      );

      console.log("Actualización completada exitosamente.");

      return response.changes > 0;
    } catch (error) {
      console.error("Error al actualizar siblings:", error.message);
    }
  }

  async findAll() {
    try {
      return await this.db.getAllAsync(`SELECT * FROM siblings`);
    } catch (error) {
      console.error("Error al obtener hermanos:", error.message);
    }
  }

  async findByRespondentId(respondentId) {
    try {
      const result = await this.db.getAllAsync(
        `SELECT * FROM siblings WHERE respondent_id = ?;`,
        [respondentId]
      );
      if (!result?.length) {
        return [];
      }
      return result.map(SiblingModel.fromObject);
    } catch (error) {
      console.error(
        "Error al obtener hermanos por ID de encuestado:",
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
        `SELECT * FROM siblings WHERE id = ?;`,
        [id]
      );
      return SiblingModel.fromObject(result);
    } catch (error) {
      console.error("Error al obtener hermano por ID:", error.message);
      return null;
    }
  }
  async delete(id) {
    try {
      await this.db.runAsync(`DELETE FROM siblings WHERE id = ?;`, [id]);
    } catch (error) {
      console.error("Error al eliminar hermano por ID:", error.message);
    }
  }
}
