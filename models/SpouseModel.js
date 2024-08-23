export class SpouseModel {
  id;
  name;
  age;
  occupation;
  educationLevel;
  residenceSite;
  currentAddress;
  phone;
  relationshipStatus; // Nuevo campo para relationship_status

  static fromObject(data) {
    const spouse = new SpouseModel();
    spouse.id = data.id;
    spouse.name = data.name;
    spouse.age = data.age;
    spouse.occupation = data.occupation;
    spouse.educationLevel = data.education_level;
    spouse.residenceSite = data.residence_site;
    spouse.currentAddress = data.current_address;
    spouse.phone = data.phone;
    spouse.relationshipStatus = data.relationship_status; // Asignación del nuevo campo

    return spouse;
  }
}
