export class GeneralQuestionsModel {
  id;
  aspirationIn5Years;
  howHasFeeling;
  feelsBetterInCivil;
  whatDoYouMissFromCivil;
  whatIsBestAt;
  whatYouEnjoyMost;
  mainProblem;
  mainSuccess;
  mainFailure;
  preparedForDisability;
  preparedForCapture;
  physicalSignsOrDefects;
  STIs;
  treatmentReceived;
  currentIllnesses;
  hadAnySurgeries;
  observations;

  static fromObject(data) {
    const generalQuestions = new GeneralQuestionsModel();
    generalQuestions.id = data.id;
    generalQuestions.aspirationIn5Years = data.aspiration_in_5_years;
    generalQuestions.howHasFeeling = data.how_has_feeling;
    generalQuestions.feelsBetterInCivil = data.feels_better_in_civil;
    generalQuestions.whatDoYouMissFromCivil = data.what_do_you_miss_from_civil;
    generalQuestions.whatIsBestAt = data.what_is_best_at;
    generalQuestions.whatYouEnjoyMost = data.what_you_enjoy_most;
    generalQuestions.mainProblem = data.main_problem;
    generalQuestions.mainSuccess = data.main_success;
    generalQuestions.mainFailure = data.main_failure;
    generalQuestions.preparedForDisability = data.prepared_for_disability;
    generalQuestions.preparedForCapture = data.prepared_for_capture;
    generalQuestions.physicalSignsOrDefects = data.physical_signs_or_defects;
    generalQuestions.STIs = data.STIs;
    generalQuestions.treatmentReceived = data.treatment_received;
    generalQuestions.currentIllnesses = data.current_illnesses;
    generalQuestions.hadAnySurgeries = data.had_any_surgeries;
    generalQuestions.observations = data.observations;

    return generalQuestions;
  }
}
