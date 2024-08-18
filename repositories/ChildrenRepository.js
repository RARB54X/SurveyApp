export class ChildrenRepository {
  db;

  constructor(db) {
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

  async findAll() {
    try {
      return await this.db.getAllAsync(`SELECT * FROM children`);
    } catch (error) {
      console.error("Error al obtener hijos:", error.message);
    }
  }
}
