export class SanctionsRepository {
  db;

  constructor(db) {
    this.db = db;
  }

  async create(sanction) {
    try {
      const lastInsertRowId = await new Promise((resolve, reject) => {
        this.db.withTransactionAsync(async () => {
          try {
            console.log("Insertando Sanciones...", sanction);

            // Consulta SQL para insertar en sanctions
            const response = await this.db.runAsync(
              `INSERT INTO sanctions (
                        respondent_id, reason, sanctioned_by, sanction_type, date, sanction_duration, structure
                      ) VALUES (?, ?, ?, ?, ?, ?, ?);`,
              [
                sanction.respondentId,
                sanction.reason,
                sanction.sanctionedBy,
                sanction.sanctionType,
                sanction.date,
                sanction.sanctionDuration,
                sanction.structure,
              ]
            );

            resolve(response.lastInsertRowId);
          } catch (error) {
            reject(error);
          }
        });
      });
      console.log("sanctions id insertado:", lastInsertRowId);
      return lastInsertRowId;
    } catch (error) {
      console.error("Error al insertar sanctions:", error.message);
    }
  }

  async findAll() {
    try {
      return await this.db.getAllAsync(`SELECT * FROM sanctions`);
    } catch (error) {
      console.error("Error al obtener sanctions:", error.message);
    }
  }
}
