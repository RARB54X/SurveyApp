import { useSQLiteContext } from "expo-sqlite/next";
import { NonMilitaryFamilyMembersModel } from "../models/NonMilitaryFamilyMembersModel";
export class NonMilitaryFamilyMembersRepository {
  db;

  constructor(db = useSQLiteContext()) {
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
  async update(nonMilitaryFamilyMember) {
    try {
      const response = await this.db.runAsync(
        `UPDATE NonMilitary_family_members SET 
          family_type = ?, 
          name = ?, 
          age = ?, 
          rank = ?, 
          structure = ?, 
          duration = ?, 
          current_status = ? 
        WHERE id = ?;`,
        [
          nonMilitaryFamilyMember.familyType,
          nonMilitaryFamilyMember.name,
          nonMilitaryFamilyMember.age,
          nonMilitaryFamilyMember.rank,
          nonMilitaryFamilyMember.structure,
          nonMilitaryFamilyMember.duration,
          nonMilitaryFamilyMember.currentStatus,
          nonMilitaryFamilyMember.id,
        ]
      );

      console.log("Actualización completada exitosamente.");

      return response.changes > 0;
    } catch (error) {
      console.error(
        "Error al actualizar miembro de la familia no militar:",
        error.message
      );
    }
  }
  async findByRespondentId(respondentId) {
    try {
      const result = await this.db.getAllAsync(
        `SELECT * FROM NonMilitary_family_members WHERE respondent_id = ?;`,
        [respondentId]
      );
      if (!result?.length) {
        return [];
      }
      return result.map(NonMilitaryFamilyMembersModel.fromObject);
    } catch (error) {
      console.error(
        "Error al obtener miembros de la familia no militar por ID de encuestado:",
        error.message
      );
      return [];
    }
  }

  async findById(id) {
    try {
      if (!id) {
        return null;
      }
      const result = await this.db.getFirstAsync(
        `SELECT * FROM NonMilitary_family_members WHERE id = ?;`,
        [id]
      );
      return NonMilitaryFamilyMembersModel.fromObject(result);
    } catch (error) {
      console.error(
        "Error al obtener miembro de la familia no militar por ID:",
        error.message
      );
      return null;
    }
  }

  async delete(id) {
    try {
      await this.db.runAsync(
        `DELETE FROM NonMilitary_family_members WHERE id = ?;`,
        [id]
      );
    } catch (error) {
      console.error(
        "Error al eliminar miembro de la familia no militar por ID:",
        error.message
      );
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
