import { useSQLiteContext } from "expo-sqlite/next";
import { ChildrenModel } from "../models/ChildrenModel";
export class ChildrenRepository {
  db;

  constructor(db = useSQLiteContext()) {
    this.db = db;
  }

  async create(child) {
    try {
      const lastInsertRowId = await new Promise((resolve, reject) => {
        this.db.withTransactionAsync(async () => {
          try {
            console.log("Insertando hijo", child);

            // Consulta SQL para insertar en children
            const response = await this.db.runAsync(
              `INSERT INTO children (
                        respondent_id, name, age, occupation, education_level, residence_site, 
                        current_address, phone, spouse
                      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
              [
                child.respondentId,
                child.name,
                child.age,
                child.occupation,
                child.educationLevel,
                child.residenceSite,
                child.currentAddress,
                child.phone,
                child.spouse,
              ]
            );

            resolve(response.lastInsertRowId);
          } catch (error) {
            reject(error);
          }
        });
      });
      console.log("Children id insertado:", lastInsertRowId);
      return lastInsertRowId;
    } catch (error) {
      console.error("Error al insertar hijo:", error.message);
    }
  }

  async update(child) {
    try {
      const response = await this.db.runAsync(
        `UPDATE children SET 
                name = ?, age = ?, occupation = ?, education_level = ?, residence_site = ?, 
                current_address = ?, phone = ?, spouse = ?
            WHERE id = ?;`,
        [
          child.name,
          child.age,
          child.occupation,
          child.educationLevel,
          child.residenceSite,
          child.currentAddress,
          child.phone,
          child.spouse,
          child.id,
        ]
      );

      console.log("Actualización completada exitosamente.");

      return response.changes > 0;
    } catch (error) {
      console.error("Error al actualizar child:", error.message);
    }
  }

  async findAll() {
    try {
      return await this.db.getAllAsync(`SELECT * FROM children`);
    } catch (error) {
      console.error("Error al obtener hijos:", error.message);
    }
  }
  async findByRespondentId(respondentId) {
    try {
      const result = await this.db.getAllAsync(
        `SELECT * FROM children WHERE respondent_id = ?;`,
        [respondentId]
      );
      if (!result?.length) {
        return [];
      }
      return result.map(ChildrenModel.fromObject);
    } catch (error) {
      console.error(
        "Error al obtener hijos por ID de encuestado:",
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
        `SELECT * FROM children WHERE id = ?;`,
        [id]
      );
      return ChildrenModel.fromObject(result);
    } catch (error) {
      console.error("Error al obtener hijo por ID:", error.message);
      return null;
    }
  }

  async delete(id) {
    try {
      await this.db.runAsync(`DELETE FROM children WHERE id = ?;`, [id]);
    } catch (error) {
      console.error("Error al eliminar hijo por ID:", error.message);
    }
  }
}
