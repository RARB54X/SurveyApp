export class MilitaryFamilyMembersModel {
  id;
  familyTypeInMilitary;
  familyNameInMilitary;
  familyAgeInMilitary;
  familyProfessionInMilitary;
  timeInMilitary;
  familyRank;
  familyUnit;
  familyServiceLocation;

  static fromObject(data) {
    const militaryFamilyMembers = new MilitaryFamilyMembersModel();
    militaryFamilyMembers.id = data.id;
    militaryFamilyMembers.familyTypeInMilitary = data.family_type_in_military;
    militaryFamilyMembers.familyNameInMilitary = data.family_name_in_military;
    militaryFamilyMembers.familyAgeInMilitary = data.family_age_in_military;
    militaryFamilyMembers.familyProfessionInMilitary =
      data.family_profession_in_military;
    militaryFamilyMembers.timeInMilitary = data.time_in_military;
    militaryFamilyMembers.familyRank = data.family_rank;
    militaryFamilyMembers.familyUnit = data.family_unit;
    militaryFamilyMembers.familyServiceLocation = data.family_service_location;

    return militaryFamilyMembers;
  }
}
