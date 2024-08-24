import { GeneralQuestionsModel } from "../models/GeneralQuestionsModel";
import { useSQLiteContext } from "expo-sqlite/next";

export class GeneralQuestionsRepository {
  db;

  constructor(db = useSQLiteContext()) {
    this.db = db;
  }
  async create(generalQuestions) {
    try {
      const lastInsertRowId = await new Promise((resolve, reject) => {
        this.db.withTransactionAsync(async () => {
          try {
            console.log("Insertando Preguntas Generales...", generalQuestions);

            // Consulta SQL para insertar en general_questions
            const response = await this.db.runAsync(
              `INSERT INTO general_questions (
                        respondent_id, aspiration_in_5_years, how_has_feeling, feels_better_in_civil,
                        what_do_you_miss_from_civil, what_is_best_at, what_you_enjoy_most, main_problem,
                        main_success, main_failure, prepared_for_disability, prepared_for_capture,
                        physical_signs_or_defects, STIs, treatment_received, current_illnesses,
                        had_any_surgeries, observations
                      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
              [
                generalQuestions.respondentId,
                generalQuestions.aspirationIn5Years,
                generalQuestions.howHasFeeling,
                generalQuestions.feelsBetterInCivil,
                generalQuestions.whatDoYouMissFromCivil,
                generalQuestions.whatIsBestAt,
                generalQuestions.whatYouEnjoyMost,
                generalQuestions.mainProblem,
                generalQuestions.mainSuccess,
                generalQuestions.mainFailure,
                generalQuestions.preparedForDisability,
                generalQuestions.preparedForCapture,
                generalQuestions.physicalSignsOrDefects,
                generalQuestions.STIs,
                generalQuestions.treatmentReceived,
                generalQuestions.currentIllnesses,
                generalQuestions.hadAnySurgeries,
                generalQuestions.observations,
              ]
            );

            resolve(response.lastInsertRowId);
          } catch (error) {
            reject(error);
          }
        });
      });
      console.log("generalQuestions id insertado:", lastInsertRowId);
      return lastInsertRowId;
    } catch (error) {
      console.error("Error al insertar generalQuestions:", error.message);
    }
  }
  async update(generalQuestions) {
    try {
      const response = await this.db.runAsync(
        `UPDATE general_questions SET 
                  aspiration_in_5_years = ?, how_has_feeling = ?, feels_better_in_civil = ?, 
                  what_do_you_miss_from_civil = ?, what_is_best_at = ?, what_you_enjoy_most = ?, 
                  main_problem = ?, main_success = ?, main_failure = ?, prepared_for_disability = ?, 
                  prepared_for_capture = ?, physical_signs_or_defects = ?, STIs = ?, treatment_received = ?, 
                  current_illnesses = ?, had_any_surgeries = ?, observations = ?
              WHERE id = ?;`,
        [
          generalQuestions.aspirationIn5Years,
          generalQuestions.howHasFeeling,
          generalQuestions.feelsBetterInCivil,
          generalQuestions.whatDoYouMissFromCivil,
          generalQuestions.whatIsBestAt,
          generalQuestions.whatYouEnjoyMost,
          generalQuestions.mainProblem,
          generalQuestions.mainSuccess,
          generalQuestions.mainFailure,
          generalQuestions.preparedForDisability,
          generalQuestions.preparedForCapture,
          generalQuestions.physicalSignsOrDefects,
          generalQuestions.STIs,
          generalQuestions.treatmentReceived,
          generalQuestions.currentIllnesses,
          generalQuestions.hadAnySurgeries,
          generalQuestions.observations,
          generalQuestions.id,
        ]
      );

      console.log("Actualización completada exitosamente.");

      return response.changes > 0;
    } catch (error) {
      console.error("Error al actualizar general_questions:", error.message);
    }
  }
  async findByRespondentId(respondentId) {
    try {
      const result = await this.db.getFirstAsync(
        `SELECT * FROM general_questions WHERE respondent_id = ?;`,
        [respondentId]
      );

      return GeneralQuestionsModel.fromObject(result);
    } catch (error) {
      console.error(
        "Error al obtener general_questions por ID de encuestado:",
        error.message
      );
    }
  }

  async findAll() {
    try {
      return await this.db.getAllAsync(`SELECT * FROM general_questions`);
    } catch (error) {
      console.error("Error al obtener generalQuestions:", error.message);
    }
  }
}
