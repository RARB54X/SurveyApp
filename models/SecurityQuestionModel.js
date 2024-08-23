export class SecurityQuestionsModel {
  id; // Asumido como el campo de identificación
  reasonForCapture; // Corresponde a `reason_for_capture`
  capturedBy; // Corresponde a `captured_by`
  captureDate; // Corresponde a `capture_date`
  captureLocation; // Corresponde a `capture_location`
  prisonName; // Corresponde a `prison_name`
  prisonDuration; // Corresponde a `prison_duration`
  releaseMethod; // Corresponde a `release_method`
  militaryServiceStart; // Corresponde a `military_service_start`
  militaryServiceLocation; // Corresponde a `military_service_location`
  militaryServiceEnd; // Corresponde a `military_service_end`
  otherOrganization; // Corresponde a `other_organization`
  otherOrganizationDuration; // Corresponde a `other_organization_duration`
  reasonForLeavingOrganization; // Corresponde a `reason_for_leaving_organization`
  hasMilitaryFriends; // Corresponde a `has_military_friends`

  static fromObject(data) {
    const securityQuestions = new SecurityQuestionsModel();
    securityQuestions.id = data.id;
    securityQuestions.reasonForCapture = data.reason_for_capture;
    securityQuestions.capturedBy = data.captured_by;
    securityQuestions.captureDate = data.capture_date;
    securityQuestions.captureLocation = data.capture_location;
    securityQuestions.prisonName = data.prison_name;
    securityQuestions.prisonDuration = data.prison_duration;
    securityQuestions.releaseMethod = data.release_method;
    securityQuestions.militaryServiceStart = data.military_service_start;
    securityQuestions.militaryServiceLocation = data.military_service_location;
    securityQuestions.militaryServiceEnd = data.military_service_end;
    securityQuestions.otherOrganization = data.other_organization;
    securityQuestions.otherOrganizationDuration =
      data.other_organization_duration;
    securityQuestions.reasonForLeavingOrganization =
      data.reason_for_leaving_organization;
    securityQuestions.hasMilitaryFriends = data.has_military_friends;

    return securityQuestions;
  }
}
