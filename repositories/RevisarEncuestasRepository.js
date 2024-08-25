export class RevisarEncuestasRepository {
  db;

  constructor(db) {
    this.db = db;
  }

  // Método para obtener todos los 'respondents' con los nombres de los entrevistadores
  // Método para obtener todos los 'respondents' con sus nombres completos y el nombre del entrevistador
  async findAll() {
    const sql = `SELECT respondents.id, 
                        respondents.first_name || ' ' || respondents.last_name AS respondent_name, 
                        respondents.name_interviewer AS interviewer_name 
                 FROM respondents;`;

    try {
      const result = await this.db.getAllAsync(sql);
      console.log(result); // Verifica el resultado en la consola
      return result;
    } catch (error) {
      console.error(
        "Error al obtener respondents con entrevistadores:",
        error.message
      );
    }
  }
  async findAllInterviewers() {
    const sql = `SELECT * FROM respondents ;`;

    try {
      // Ejecuta la consulta y devuelve los resultados
      const result = await this.db.getAllAsync(sql);
      console.log(result); // Verifica el resultado
      return result;
    } catch (error) {
      console.error("Error al obtener los entrevistadores:", error.message);
    }
  }
  async delete(id) {
    try {
      await this.db.runAsync(`DELETE FROM respondents WHERE id = ?;`, [id]);
    } catch (error) {
      console.error("Error al eliminar respondents por ID:", error.message);
    }
  }
}
