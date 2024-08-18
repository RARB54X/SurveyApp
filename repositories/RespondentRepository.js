export class RespondentRepository {
  db;
  constructor(db) {
    this.db = db;
  }

  async create(respondent) {
    try {
      const lastInsertRowId = await new Promise((resolve, reject) => {
        this.db.withTransactionAsync(async () => {
          try {
            console.log("Insertando respondent...", respondent);
            const response = await this.db.runAsync(
              `INSERT INTO respondents (
                        first_name, last_name, supervisor_elaborates, nickname, birth_date, age, 
                        document_type, id_number, place_of_birth, place_of_residence, 
                        education, profession_occupation, marital_status, incorporation_date, 
                        incorporation_place, who_incorporated, received_supervisor, incorporation_structure, 
                        other_structure, position_supervisor, duration, tasks, reason_for_incorporation, 
                        parental_illness, family_agreement, has_previous_experience, mother_id, father_id, 
                        spouse_id, interviewer_id
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
              [
                respondent.firstName,
                respondent.lastName,
                respondent.supervisorElaborates,
                respondent.nickname,
                respondent.birthDate,
                respondent.age,
                respondent.documentType,
                respondent.idNumber,
                respondent.placeOfBirth,
                respondent.placeOfResidence,
                respondent.education,
                respondent.professionOccupation,
                respondent.maritalStatus,
                respondent.incorporationDate,
                respondent.incorporationPlace,
                respondent.whoIncorporated,
                respondent.receivedSupervisor,
                respondent.incorporationStructure,
                respondent.otherStructure,
                respondent.positionSupervisor,
                respondent.duration,
                respondent.tasks,
                respondent.reasonForIncorporation,
                respondent.parentalIllness,
                respondent.familyAgreement,
                respondent.hasPreviousExperience,
                respondent.motherId,
                respondent.fatherId,
                respondent.spouseId,
                respondent.interviewerId,
              ]
            );
            resolve(response.lastInsertRowId);
          } catch (error) {
            reject(error);
          }
        });
      });

      console.log("Insertación completada exitosamente.");

      return lastInsertRowId;
    } catch (error) {
      console.error("Error al insertar respondent:", error.message);
    }
  }

  findAll() {
    return this.db.getAllAsync(`SELECT * FROM respondents`);
  }
}
