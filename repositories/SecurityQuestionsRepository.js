export class SecurityQuestionsRepository {
  db;

  constructor(db) {
    this.db = db;
  }

  async create(securityQuestion) {
    try {
      const lastInsertRowId = await new Promise((resolve, reject) => {
        this.db.withTransactionAsync(async () => {
          try {
            console.log(
              "Insertando Preguntas de Seguridad...",
              securityQuestion
            );

            // Consulta SQL para insertar en security_questions
            const response = await this.db.runAsync(
              `INSERT INTO security_questions (
                        respondent_id, reason_for_capture, captured_by, capture_date, capture_location, 
                        prison_name, prison_duration, release_method, military_service_start, 
                        military_service_location, military_service_end, other_organization, 
                        other_organization_duration, reason_for_leaving_organization, has_military_friends
                      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
              [
                securityQuestion.respondentId,
                securityQuestion.reasonForCapture,
                securityQuestion.capturedBy,
                securityQuestion.captureDate,
                securityQuestion.captureLocation,
                securityQuestion.prisonName,
                securityQuestion.prisonDuration,
                securityQuestion.releaseMethod,
                securityQuestion.militaryServiceStart,
                securityQuestion.militaryServiceLocation,
                securityQuestion.militaryServiceEnd,
                securityQuestion.otherOrganization,
                securityQuestion.otherOrganizationDuration,
                securityQuestion.reasonForLeavingOrganization,
                securityQuestion.hasMilitaryFriends,
              ]
            );

            resolve(response.lastInsertRowId);
          } catch (error) {
            reject(error);
          }
        });
      });
      console.log("securityQuestion id insertado:", lastInsertRowId);
      return lastInsertRowId;
    } catch (error) {
      console.error("Error al insertar securityQuestion:", error.message);
    }
  }

  async findAll() {
    try {
      return await this.db.getAllAsync(`SELECT * FROM security_questions`);
    } catch (error) {
      console.error("Error al obtener securityQuestions:", error.message);
    }
  }
}
