export class NonMilitaryFamilyMembersModel {
  id; // Asumido como el campo de identificación
  familyType; // Corresponde a `family_type`
  name;
  age;
  rank;
  structure;
  duration;
  currentStatus; // Corresponde a `current_status`

  static fromObject(data) {
    const nonMilitaryFamilyMember = new NonMilitaryFamilyMembersModel();
    nonMilitaryFamilyMember.id = data.id;
    nonMilitaryFamilyMember.familyType = data.family_type;
    nonMilitaryFamilyMember.name = data.name;
    nonMilitaryFamilyMember.age = data.age;
    nonMilitaryFamilyMember.rank = data.rank;
    nonMilitaryFamilyMember.structure = data.structure;
    nonMilitaryFamilyMember.duration = data.duration;
    nonMilitaryFamilyMember.currentStatus = data.current_status;

    return nonMilitaryFamilyMember;
  }
}
