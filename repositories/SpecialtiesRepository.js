export class SpecialtiesRepository {
  db;

  constructor(db) {
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

  async findAll() {
    try {
      return await this.db.getAllAsync(`SELECT * FROM specialties`);
    } catch (error) {
      console.error("Error al obtener specialties:", error.message);
    }
  }
}
