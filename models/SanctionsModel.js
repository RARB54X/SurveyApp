export class SanctionsModel {
  id;
  reason;
  sanctionedBy; // Corresponde a `sanctioned_by`
  sanctionType; // Corresponde a `sanction_type`
  date;
  sanctionDuration; // Corresponde a `sanction_duration`
  structure; // Corresponde a `structure`

  static fromObject(data) {
    const sanctions = new SanctionsModel();
    sanctions.id = data.id;
    sanctions.reason = data.reason;
    sanctions.sanctionedBy = data.sanctioned_by;
    sanctions.sanctionType = data.sanction_type;
    sanctions.date = data.date;
    sanctions.sanctionDuration = data.sanction_duration;
    sanctions.structure = data.structure;

    return sanctions;
  }
}
