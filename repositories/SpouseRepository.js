import { SpouseModel } from "../models/SpouseModel";
import { useSQLiteContext } from "expo-sqlite/next";
export class SpouseRepository {
  db;

  constructor(db = useSQLiteContext()) {
    this.db = db;
  }

  async create(spouse) {
    try {
      const lastInsertRowId = await new Promise((resolve, reject) => {
        this.db.withTransactionAsync(async () => {
          try {
            console.log("Insertando cónyuge", spouse);

            // Consulta SQL para insertar en spouse
            const response = await this.db.runAsync(
              `INSERT INTO spouse (
                        respondent_id, name, age, occupation, education_level, residence_site, 
                        current_address, phone, relationship_status
                      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
              [
                spouse.respondentId,
                spouse.name,
                spouse.age,
                spouse.occupation,
                spouse.educationLevel,
                spouse.residenceSite,
                spouse.currentAddress,
                spouse.phone,
                spouse.relationshipStatus,
              ]
            );

            resolve(response.lastInsertRowId);
          } catch (error) {
            reject(error);
          }
        });
      });
      console.log("Spouse id insertado:", lastInsertRowId);
      return lastInsertRowId;
    } catch (error) {
      console.error("Error al insertar cónyuge:", error.message);
    }
  }

  async update(spouse) {
    try {
      const response = await this.db.runAsync(
        `UPDATE spouse SET 
                name = ?, age = ?, occupation = ?, education_level = ?, residence_site = ?, 
                current_address = ?, phone = ?, relationship_status = ?
            WHERE id = ?;`,
        [
          spouse.name,
          spouse.age,
          spouse.occupation,
          spouse.educationLevel,
          spouse.residenceSite,
          spouse.currentAddress,
          spouse.phone,
          spouse.relationshipStatus,
          spouse.id,
        ]
      );

      console.log("Actualización completada exitosamente.");

      return response.changes > 0;
    } catch (error) {
      console.error("Error al actualizar spouse:", error.message);
    }
  }
  async findByRespondentId(respondentId) {
    try {
      const result = await this.db.getFirstAsync(
        `SELECT * FROM spouse WHERE respondent_id = ?;`,
        [respondentId]
      );

      return SpouseModel.fromObject(result);
    } catch (error) {
      console.error(
        "Error al obtener spouse por ID de encuestado:",
        error.message
      );
    }
  }

  async findAll() {
    try {
      return await this.db.getAllAsync(`SELECT * FROM spouse`);
    } catch (error) {
      console.error("Error al obtener cónyuges:", error.message);
    }
  }
}
