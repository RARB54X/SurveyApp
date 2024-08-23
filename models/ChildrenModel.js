export class ChildrenModel {
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
    const child = new ChildrenModel();
    child.id = data.id;
    child.name = data.name;
    child.age = data.age;
    child.occupation = data.occupation;
    child.educationLevel = data.education_level;
    child.residenceSite = data.residence_site;
    child.currentAddress = data.current_address;
    child.phone = data.phone;
    child.spouse = data.spouse;

    return child;
  }
}
