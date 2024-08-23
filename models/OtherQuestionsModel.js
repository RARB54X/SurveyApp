export class OtherQuestionsModel {
  id;
  livedWithFirst7Years;
  punishmentMethod;
  rewardMethod;
  childhoodAspiration;
  currentAspiration;
  relationshipWithFather;
  relationshipWithMother;
  relationshipWithSiblings;
  hasStablePartner;
  timeWithPartner;
  relationshipWithPartner;
  ageOfFirstSexualRelationship;
  currentSituation;
  affectionDemonstration;
  inLove;
  fears;
  biggestFear;
  greatestJoy;
  responseToOffenseOrAttack;

  static fromObject(data) {
    const otherQuestions = new OtherQuestionsModel();
    otherQuestions.id = data.id;
    otherQuestions.livedWithFirst7Years = data.lived_with_first_7_years;
    otherQuestions.punishmentMethod = data.punishment_method;
    otherQuestions.rewardMethod = data.reward_method;
    otherQuestions.childhoodAspiration = data.childhood_aspiration;
    otherQuestions.currentAspiration = data.current_aspiration;
    otherQuestions.relationshipWithFather = data.relationship_with_father;
    otherQuestions.relationshipWithMother = data.relationship_with_mother;
    otherQuestions.relationshipWithSiblings = data.relationship_with_siblings;
    otherQuestions.hasStablePartner = data.has_stable_partner;
    otherQuestions.timeWithPartner = data.time_with_partner;
    otherQuestions.relationshipWithPartner = data.relationship_with_partner;
    otherQuestions.ageOfFirstSexualRelationship =
      data.age_of_first_sexual_relationship;
    otherQuestions.currentSituation = data.current_situation;
    otherQuestions.affectionDemonstration = data.affection_demonstration;
    otherQuestions.inLove = data.in_love;
    otherQuestions.fears = data.fears;
    otherQuestions.biggestFear = data.biggest_fear;
    otherQuestions.greatestJoy = data.greatest_joy;
    otherQuestions.responseToOffenseOrAttack =
      data.response_to_offense_or_attack;

    return otherQuestions;
  }
}
