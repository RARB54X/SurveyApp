export class FatherRepository {
  db;

  constructor(db) {
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

  async findAll() {
    try {
      return await this.db.getAllAsync(`SELECT * FROM father`);
    } catch (error) {
      console.error("Error al obtener padres:", error.message);
    }
  }
}
