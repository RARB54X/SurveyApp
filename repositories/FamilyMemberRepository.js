export class FamilyMemberRepository {
  db;

  constructor(db) {
    this.db = db;
  }

  async create(familyMember) {
    try {
      const lastInsertRowId = await new Promise((resolve, reject) => {
        this.db.withTransactionAsync(async () => {
          try {
            console.log("Insertando familiar", familyMember);

            // Consulta SQL para insertar en family_member
            const response = await this.db.runAsync(
              `INSERT INTO family_member (
                      respondent_id, name, age, occupation, education_level, residence_site, 
                      current_address, phone, spouse, relationship_status, relationship_type
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
              [
                familyMember.respondentId,
                familyMember.name,
                familyMember.age,
                familyMember.occupation,
                familyMember.educationLevel,
                familyMember.residenceSite,
                familyMember.currentAddress,
                familyMember.phone,
                familyMember.spouse,
                familyMember.relationshipStatus,
                familyMember.relationshipType,
              ]
            );

            resolve(response.lastInsertRowId);
          } catch (error) {
            reject(error);
          }
        });
      });
      console.log("familyMember id insertado:", lastInsertRowId);
      return lastInsertRowId;
    } catch (error) {
      console.error("Error al insertar familyMember:", error.message);
    }
  }

  async findAll() {
    try {
      return await this.db.getAllAsync(`SELECT * FROM family_member`);
    } catch (error) {
      console.error("Error al obtener familyMembers:", error.message);
    }
  }
}
