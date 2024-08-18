export class EducationRepository {
  db;

  constructor(db) {
    this.db = db;
  }

  async create(education) {
    try {
      const lastInsertRowId = await new Promise((resolve, reject) => {
        this.db.withTransactionAsync(async () => {
          try {
            console.log("Insertando Educación...", education);

            // Consulta SQL para insertar en education
            const response = await this.db.runAsync(
              `INSERT INTO education (
                        respondent_id, training_type, training_duration, year_of_completion, structure
                      ) VALUES (?, ?, ?, ?, ?);`,
              [
                education.respondentId,
                education.trainingType,
                education.trainingDuration,
                education.yearOfCompletion,
                education.structure,
              ]
            );

            resolve(response.lastInsertRowId);
          } catch (error) {
            reject(error);
          }
        });
      });
      console.log("education id insertado:", lastInsertRowId);
      return lastInsertRowId;
    } catch (error) {
      console.error("Error al insertar education:", error.message);
    }
  }

  async findAll() {
    try {
      return await this.db.getAllAsync(`SELECT * FROM education`);
    } catch (error) {
      console.error("Error al obtener educations:", error.message);
    }
  }
}
