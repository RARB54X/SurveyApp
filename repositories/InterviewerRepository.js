export class InterviewerRepository {
  db;
  constructor(db) {
    this.db = db;
  }

  async create(interviewer) {
    try {
      const lastInsertRowId = await new Promise((resolve, reject) => {
        this.db.withTransactionAsync(async () => {
          try {
            console.log("Insertando ...", interviewer);
            const response = await this.db.runAsync(
              `INSERT INTO interviewers (name, id_card, date) VALUES (?, ?, ?);`,
              [interviewer.name, interviewer.idCard, interviewer.date]
            );
            resolve(response.lastInsertRowId);
          } catch (error) {
            reject(error);
          }
        });
      });

      console.log("interviewer id insertado:", lastInsertRowId);
      return lastInsertRowId;
    } catch (error) {
      console.error("Error al insertar interviewer:", error.message);
    }
  }

  async findByIdCard(idCard) {
    try {
      return await this.db.getFirstAsync(
        `SELECT * FROM interviewers WHERE id_card = ? LIMIT 1;`,
        [idCard]
      );
    } catch (error) {
      console.error("Error al obtener interviewers por idCard:", error.message);
      return undefined;
    }
  }

  findAll() {
    return this.db.getAllAsync(`SELECT * FROM interviewers`);
  }
}
