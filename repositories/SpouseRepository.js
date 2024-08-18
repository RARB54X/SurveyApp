export class SpouseRepository {
  db;

  constructor(db) {
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

  async findAll() {
    try {
      return await this.db.getAllAsync(`SELECT * FROM spouse`);
    } catch (error) {
      console.error("Error al obtener cónyuges:", error.message);
    }
  }
}
