export class SiblingModel {
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
    const sibling = new SiblingModel();
    sibling.id = data.id;
    sibling.name = data.name;
    sibling.age = data.age;
    sibling.occupation = data.occupation;
    sibling.educationLevel = data.education_level;
    sibling.residenceSite = data.residence_site;
    sibling.currentAddress = data.current_address;
    sibling.phone = data.phone;
    sibling.spouse = data.spouse;

    return sibling;
  }
}
