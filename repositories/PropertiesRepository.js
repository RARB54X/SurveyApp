export class PropertiesRepository {
  db;

  constructor(db) {
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

  async findAll() {
    try {
      return await this.db.getAllAsync(`SELECT * FROM properties`);
    } catch (error) {
      console.error("Error al obtener properties:", error.message);
    }
  }
}
