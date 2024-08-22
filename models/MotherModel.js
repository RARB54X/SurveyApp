export class MotherModel {
  id;
  name;
  age;
  occupation;
  educationLevel;
  residenceSite;
  currentAddress;
  phone;
  spouse;

  static fromObject(data) {
    const mother = new MotherModel();
    mother.id = data.id;
    mother.name = data.name;
    mother.age = data.age;
    mother.occupation = data.occupation;
    mother.educationLevel = data.education_level;
    mother.residenceSite = data.residence_site;
    mother.currentAddress = data.current_address;
    mother.phone = data.phone;
    mother.spouse = data.spouse;

    return mother;
  }
}
