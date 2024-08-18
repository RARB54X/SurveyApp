export class NonMilitaryFamilyMembersRepository {
  db;

  constructor(db) {
    this.db = db;
  }

  async create(nonMilitaryFamilyMember) {
    try {
      const lastInsertRowId = await new Promise((resolve, reject) => {
        this.db.withTransactionAsync(async () => {
          try {
            console.log(
              "Insertando Familiares en las Fuerzas Militares...",
              nonMilitaryFamilyMember
            );

            // Consulta SQL para insertar en military_family_members
            const response = await this.db.runAsync(
              `INSERT INTO NonMilitary_family_members (
                        respondent_id, family_type, name, age, rank, structure, duration, current_status
                      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
              [
                nonMilitaryFamilyMember.respondentId,
                nonMilitaryFamilyMember.familyType,
                nonMilitaryFamilyMember.name,
                nonMilitaryFamilyMember.age,
                nonMilitaryFamilyMember.rank,
                nonMilitaryFamilyMember.structure,
                nonMilitaryFamilyMember.duration,
                nonMilitaryFamilyMember.currentStatus,
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
      return await this.db.getAllAsync(
        `SELECT * FROM NonMilitary_family_members`
      );
    } catch (error) {
      console.error(
        "Error al obtener NonMilitary_family_members:",
        error.message
      );
    }
  }
}
