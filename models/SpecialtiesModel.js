export class SpecialtiesModel {
  id;
  specialtyType; // Corresponde a `specialty_type`
  duration; // Corresponde a `duration`
  structure; // Corresponde a `structure`

  static fromObject(data) {
    const specialties = new SpecialtiesModel();
    specialties.id = data.id;
    specialties.specialtyType = data.specialty_type;
    specialties.duration = data.duration;
    specialties.structure = data.structure;

    return specialties;
  }
}
