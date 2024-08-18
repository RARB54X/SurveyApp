export class RevisarEncuestasRepository {
  db;

  constructor(db) {
    this.db = db;
  }

  // Método para obtener todos los 'respondents' con los nombres de los entrevistadores
  async findAll() {
    const sql = `
          SELECT 
            r.first_name AS respondent_first_name,
            r.last_name AS respondent_last_name,
            i.name AS interviewer_name
          FROM respondents r
          LEFT JOIN interviewers i ON r.interviewer_id = i.id
        `;

    try {
      return await this.db.getAllAsync(sql);
    } catch (error) {
      console.error(
        "Error al obtener respondents con entrevistadores:",
        error.message
      );
    }
  }
}
