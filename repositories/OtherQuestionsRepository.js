export class OtherQuestionsRepository {
  db;

  constructor(db) {
    this.db = db;
  }

  async create(otherQuestion) {
    try {
      const lastInsertRowId = await new Promise((resolve, reject) => {
        this.db.withTransactionAsync(async () => {
          try {
            console.log("Insertando Otras Preguntas...", otherQuestion);

            // Consulta SQL para insertar en other_questions
            const response = await this.db.runAsync(
              `INSERT INTO other_questions (
                        respondent_id, lived_with_first_7_years, punishment_method, reward_method, 
                        childhood_aspiration, current_aspiration, relationship_with_father, 
                        relationship_with_mother, relationship_with_siblings, has_stable_partner, 
                        time_with_partner, relationship_with_partner, age_of_first_sexual_relationship, 
                        current_situation, affection_demonstration, in_love, fears, biggest_fear, 
                        greatest_joy, response_to_offense_or_attack
                      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
              [
                otherQuestion.respondentId,
                otherQuestion.livedWithFirst7Years,
                otherQuestion.punishmentMethod,
                otherQuestion.rewardMethod,
                otherQuestion.childhoodAspiration,
                otherQuestion.currentAspiration,
                otherQuestion.relationshipWithFather,
                otherQuestion.relationshipWithMother,
                otherQuestion.relationshipWithSiblings,
                otherQuestion.hasStablePartner,
                otherQuestion.timeWithPartner,
                otherQuestion.relationshipWithPartner,
                otherQuestion.ageOfFirstSexualRelationship,
                otherQuestion.currentSituation,
                otherQuestion.affectionDemonstration,
                otherQuestion.inLove,
                otherQuestion.fears,
                otherQuestion.biggestFear,
                otherQuestion.greatestJoy,
                otherQuestion.responseToOffenseOrAttack,
              ]
            );

            resolve(response.lastInsertRowId);
          } catch (error) {
            reject(error);
          }
        });
      });
      console.log("otherQuestion id insertado:", lastInsertRowId);
      return lastInsertRowId;
    } catch (error) {
      console.error("Error al insertar otherQuestion:", error.message);
    }
  }

  async findAll() {
    try {
      return await this.db.getAllAsync(`SELECT * FROM other_questions`);
    } catch (error) {
      console.error("Error al obtener otherQuestions:", error.message);
    }
  }
}
