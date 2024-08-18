export class MilitaryFamilyMembersRepository {
  db;

  constructor(db) {
    this.db = db;
  }

  async create(militaryFamilyMember) {
    try {
      const lastInsertRowId = await new Promise((resolve, reject) => {
        this.db.withTransactionAsync(async () => {
          try {
            console.log(
              "Insertando Familiares en las Fuerzas Militares...",
              militaryFamilyMember
            );

            // Consulta SQL para insertar en military_family_members
            const response = await this.db.runAsync(
              `INSERT INTO military_family_members (
                        respondent_id, family_type_in_military, family_name_in_military, family_age_in_military, 
                        family_profession_in_military, time_in_military, family_rank, family_unit, 
                        family_service_location
                      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
              [
                militaryFamilyMember.respondentId,
                militaryFamilyMember.familyTypeInMilitary,
                militaryFamilyMember.familyNameInMilitary,
                militaryFamilyMember.familyAgeInMilitary,
                militaryFamilyMember.familyProfessionInMilitary,
                militaryFamilyMember.timeInMilitary,
                militaryFamilyMember.familyRank,
                militaryFamilyMember.familyUnit,
                militaryFamilyMember.familyServiceLocation,
              ]
            );

            resolve(response.lastInsertRowId);
          } catch (error) {
            reject(error);
          }
        });
      });
      console.log("militaryFamilyMember id insertado:", lastInsertRowId);
      return lastInsertRowId;
    } catch (error) {
      console.error("Error al insertar militaryFamilyMember:", error.message);
    }
  }

  async findAll() {
    try {
      return await this.db.getAllAsync(`SELECT * FROM military_family_members`);
    } catch (error) {
      console.error("Error al obtener militaryFamilyMembers:", error.message);
    }
  }
}
