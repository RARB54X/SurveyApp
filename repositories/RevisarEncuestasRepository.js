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
  // Método para obtener todos los 'respondents' con sus datos relacionados
  async getAllRespondentsData() {
    try {
      // Obtener todos los respondents
      const respondentsQuery = `SELECT * FROM respondents`;
      const respondentsResult = await this.db.getAllAsync(respondentsQuery);

      // Array para almacenar los datos completos de cada respondent
      let respondentsData = [];

      // Iterar sobre cada respondent y obtener sus datos relacionados
      for (let respondent of respondentsResult) {
        let respondentData = { ...respondent };

        // Obtener datos de la tabla 'mother'
        const motherQuery = `SELECT * FROM mother WHERE respondent_id = ?`;
        const motherResult = await this.db.getAllAsync(motherQuery, [
          respondent.id,
        ]);
        respondentData.mother =
          motherResult.length > 0 ? motherResult[0] : null;

        // Obtener datos de la tabla 'siblings'
        const siblingsQuery = `SELECT * FROM siblings WHERE respondent_id = ?`;
        const siblingsResult = await this.db.getAllAsync(siblingsQuery, [
          respondent.id,
        ]);
        respondentData.siblings = siblingsResult; // Esto es un array de hermanos

        // Obtener datos de la tabla 'father'
        const fatherQuery = `SELECT * FROM father WHERE respondent_id = ?`;
        const fatherResult = await this.db.getAllAsync(fatherQuery, [
          respondent.id,
        ]);
        respondentData.father =
          fatherResult.length > 0 ? fatherResult[0] : null;

        // Obtener datos de la tabla 'spouse'
        const spouseQuery = `SELECT * FROM spouse WHERE respondent_id = ?`;
        const spouseResult = await this.db.getAllAsync(spouseQuery, [
          respondent.id,
        ]);
        respondentData.spouse =
          spouseResult.length > 0 ? spouseResult[0] : null;

        // Obtener datos de la tabla 'children'
        const childrenQuery = `SELECT * FROM children WHERE respondent_id = ?`;
        const childrenResult = await this.db.getAllAsync(childrenQuery, [
          respondent.id,
        ]);
        respondentData.children = childrenResult; // Esto es un array de hermanos

        // Obtener datos de la tabla 'education'
        const educationQuery = `SELECT * FROM education WHERE respondent_id = ?`;
        const educationResult = await this.db.getAllAsync(educationQuery, [
          respondent.id,
        ]);
        respondentData.education = educationResult;

        // Obtener datos de la tabla 'action'
        const actionQuery = `SELECT * FROM action WHERE respondent_id = ?`;
        const actionResult = await this.db.getAllAsync(actionQuery, [
          respondent.id,
        ]);
        respondentData.actions = actionResult;

        // Obtener datos de la tabla 'specialties'
        const specialtiesQuery = `SELECT * FROM specialties WHERE respondent_id = ?`;
        const specialtiesResult = await this.db.getAllAsync(specialtiesQuery, [
          respondent.id,
        ]);
        respondentData.specialties = specialtiesResult;

        // Obtener datos de la tabla 'sanctions'
        const sanctionsQuery = `SELECT * FROM sanctions WHERE respondent_id = ?`;
        const sanctionsResult = await this.db.getAllAsync(sanctionsQuery, [
          respondent.id,
        ]);
        respondentData.sanctions = sanctionsResult;

        // Obtener datos de la tabla 'NonMilitary_family_members'
        const nonMilitaryFamilyQuery = `SELECT * FROM NonMilitary_family_members WHERE respondent_id = ?`;
        const nonMilitaryFamilyResult = await this.db.getAllAsync(
          nonMilitaryFamilyQuery,
          [respondent.id]
        );
        respondentData.nonMilitaryFamilyMembers = nonMilitaryFamilyResult;

        // Obtener datos de la tabla 'properties'
        const propertiesQuery = `SELECT * FROM properties WHERE respondent_id = ?`;
        const propertiesResult = await this.db.getAllAsync(propertiesQuery, [
          respondent.id,
        ]);
        respondentData.properties = propertiesResult;

        // Obtener datos de la tabla 'military_family_members'
        const militaryFamilyQuery = `SELECT * FROM military_family_members WHERE respondent_id = ?`;
        const militaryFamilyResult = await this.db.getAllAsync(
          militaryFamilyQuery,
          [respondent.id]
        );
        respondentData.militaryFamilyMembers = militaryFamilyResult;

        // Obtener datos de la tabla 'security_questions'
        const securityQuestionsQuery = `SELECT * FROM security_questions WHERE respondent_id = ?`;
        const securityQuestionsResult = await this.db.getAllAsync(
          securityQuestionsQuery,
          [respondent.id]
        );
        respondentData.securityQuestions =
          securityQuestionsResult.length > 0
            ? securityQuestionsResult[0]
            : null;

        // Obtener datos de la tabla 'general_questions'
        const generalQuestionsQuery = `SELECT * FROM general_questions WHERE respondent_id = ?`;
        const generalQuestionsResult = await this.db.getAllAsync(
          generalQuestionsQuery,
          [respondent.id]
        );
        respondentData.generalQuestions =
          generalQuestionsResult.length > 0 ? generalQuestionsResult[0] : null;

        // Obtener datos de la tabla 'other_questions'
        const otherQuestionsQuery = `SELECT * FROM other_questions WHERE respondent_id = ?`;
        const otherQuestionsResult = await this.db.getAllAsync(
          otherQuestionsQuery,
          [respondent.id]
        );
        respondentData.otherQuestions =
          otherQuestionsResult.length > 0 ? otherQuestionsResult[0] : null;

        // Repite este bloque para otras tablas relacionadas como 'father', 'spouse', etc.

        // Agregar el respondentData completo al array
        respondentsData.push(respondentData);
      }

      // Devuelve los datos completos
      return respondentsData;
    } catch (error) {
      console.error(
        "Error al obtener datos completos de los respondents:",
        error.message
      );
    }
  }
}
