export class ActionModel {
  id;
  actionType;
  commandingOfficer;
  yearOfCompletion;
  structure;

  static fromObject(data) {
    const action = new ActionModel();
    action.id = data.id;
    action.actionType = data.action_type;
    action.commandingOfficer = data.commanding_officer;
    action.yearOfCompletion = data.year_of_completion;
    action.structure = data.structure;

    return action;
  }
}
