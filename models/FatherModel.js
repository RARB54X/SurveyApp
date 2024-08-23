export class FatherModel {
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
    const father = new FatherModel();
    father.id = data.id;
    father.name = data.name;
    father.age = data.age;
    father.occupation = data.occupation;
    father.educationLevel = data.education_level;
    father.residenceSite = data.residence_site;
    father.currentAddress = data.current_address;
    father.phone = data.phone;
    father.spouse = data.spouse;

    return father;
  }
}
