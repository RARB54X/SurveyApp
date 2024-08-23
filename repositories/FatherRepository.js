import { FatherModel } from "../models/FatherModel";
import { useSQLiteContext } from "expo-sqlite/next";

export class FatherRepository {
  db;

  constructor(db = useSQLiteContext()) {
    this.db = db;
  }
  async create(father) {
    try {
      const lastInsertRowId = await new Promise((resolve, reject) => {
        this.db.withTransactionAsync(async () => {
          try {
            console.log("Insertando padre", father);

            // Consulta SQL para insertar en father
            const response = await this.db.runAsync(
              `INSERT INTO father (
                        respondent_id, name, age, occupation, education_level, residence_site, 
                        current_address, phone, spouse
                      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
              [
                father.respondentId,
                father.name,
                father.age,
                father.occupation,
                father.educationLevel,
                father.residenceSite,
                father.currentAddress,
                father.phone,
                father.spouse,
              ]
            );

            resolve(response.lastInsertRowId);
          } catch (error) {
            reject(error);
          }
        });
      });
      console.log("Father id insertado:", lastInsertRowId);
      return lastInsertRowId;
    } catch (error) {
      console.error("Error al insertar padre:", error.message);
    }
  }
  async update(father) {
    try {
      const response = await this.db.runAsync(
        `UPDATE father SET 
                name = ?, age = ?, occupation = ?, education_level = ?, residence_site = ?, 
                current_address = ?, phone = ?, spouse = ?
            WHERE id = ?;`,
        [
          father.name,
          father.age,
          father.occupation,
          father.educationLevel,
          father.residenceSite,
          father.currentAddress,
          father.phone,
          father.spouse,
          father.id,
        ]
      );

      console.log("Actualización completada exitosamente.");

      return response.changes > 0;
    } catch (error) {
      console.error("Error al actualizar father:", error.message);
    }
  }
  async findByRespondentId(respondentId) {
    try {
      const result = await this.db.getFirstAsync(
        `SELECT * FROM father WHERE respondent_id = ?;`,
        [respondentId]
      );

      return FatherModel.fromObject(result);
    } catch (error) {
      console.error(
        "Error al obtener padre por ID de encuestado:",
        error.message
      );
    }
  }

  async findAll() {
    try {
      return await this.db.getAllAsync(`SELECT * FROM father`);
    } catch (error) {
      console.error("Error al obtener padres:", error.message);
    }
  }
}
