export class EducationModel {
  id;
  trainingType; // Corresponde a `training_type`
  trainingDuration; // Corresponde a `training_duration`
  yearOfCompletion; // Corresponde a `year_of_completion`
  structure; // Corresponde a `structure`

  static fromObject(data) {
    const education = new EducationModel();
    education.id = data.id;
    education.trainingType = data.training_type;
    education.trainingDuration = data.training_duration;
    education.yearOfCompletion = data.year_of_completion;
    education.structure = data.structure;

    return education;
  }
}
