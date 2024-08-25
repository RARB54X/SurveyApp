import { useSQLiteContext } from "expo-sqlite/next";
import { PropertiesModel } from "../models/PropertiesModel";
export class PropertiesRepository {
  db;

  constructor(db = useSQLiteContext()) {
    this.db = db;
  }
  async create(properties) {
    try {
      const lastInsertRowId = await new Promise((resolve, reject) => {
        this.db.withTransactionAsync(async () => {
          try {
            console.log("Insertando Propiedades...", properties);

            // Consulta SQL para insertar en properties
            const response = await this.db.runAsync(
              `INSERT INTO properties (
                        respondent_id, location
                      ) VALUES (?, ?);`,
              [properties.respondentId, properties.location]
            );

            resolve(response.lastInsertRowId);
          } catch (error) {
            reject(error);
          }
        });
      });
      console.log("properties id insertado:", lastInsertRowId);
      return lastInsertRowId;
    } catch (error) {
      console.error("Error al insertar properties:", error.message);
    }
  }
  async update(properties) {
    try {
      const response = await this.db.runAsync(
        `UPDATE properties SET 
            location = ?
          WHERE id = ?;`,
        [properties.location, properties.id]
      );

      console.log("Actualización completada exitosamente.");

      return response.changes > 0;
    } catch (error) {
      console.error("Error al actualizar propiedad:", error.message);
      return false;
    }
  }

  async findByRespondentId(respondentId) {
    try {
      const result = await this.db.getAllAsync(
        `SELECT * FROM properties WHERE respondent_id = ?;`,
        [respondentId]
      );
      if (!result?.length) {
        return [];
      }
      return result.map(PropertiesModel.fromObject);
    } catch (error) {
      console.error(
        "Error al obtener propiedades por ID de encuestado:",
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
        `SELECT * FROM properties WHERE id = ?;`,
        [id]
      );
      return PropertiesModel.fromObject(result);
    } catch (error) {
      console.error("Error al obtener propiedad por ID:", error.message);
      return null;
    }
  }
  async delete(id) {
    try {
      await this.db.runAsync(`DELETE FROM properties WHERE id = ?;`, [id]);
      console.log("Eliminación completada exitosamente.");
    } catch (error) {
      console.error("Error al eliminar propiedad por ID:", error.message);
    }
  }

  async findAll() {
    try {
      return await this.db.getAllAsync(`SELECT * FROM properties`);
    } catch (error) {
      console.error("Error al obtener properties:", error.message);
    }
  }
}
