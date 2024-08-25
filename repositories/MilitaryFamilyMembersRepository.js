import { MilitaryFamilyMembersModel } from "../models/MilitaryFamilyMembersModel";
import { useSQLiteContext } from "expo-sqlite/next";
export class MilitaryFamilyMembersRepository {
  db;

  constructor(db = useSQLiteContext()) {
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
  async update(militaryFamilyMember) {
    try {
      const response = await this.db.runAsync(
        `UPDATE military_family_members SET 
            family_type_in_military = ?, 
            family_name_in_military = ?, 
            family_age_in_military = ?, 
            family_profession_in_military = ?, 
            time_in_military = ?, 
            family_rank = ?, 
            family_unit = ?, 
            family_service_location = ?
          WHERE id = ?;`,
        [
          militaryFamilyMember.familyTypeInMilitary,
          militaryFamilyMember.familyNameInMilitary,
          militaryFamilyMember.familyAgeInMilitary,
          militaryFamilyMember.familyProfessionInMilitary,
          militaryFamilyMember.timeInMilitary,
          militaryFamilyMember.familyRank,
          militaryFamilyMember.familyUnit,
          militaryFamilyMember.familyServiceLocation,
          militaryFamilyMember.id,
        ]
      );

      console.log("Actualización completada exitosamente.");
      return response.changes > 0;
    } catch (error) {
      console.error(
        "Error al actualizar miembro de la familia militar:",
        error.message
      );
      return false;
    }
  }
  async findByRespondentId(respondentId) {
    try {
      const result = await this.db.getAllAsync(
        `SELECT * FROM military_family_members WHERE respondent_id = ?;`,
        [respondentId]
      );
      if (!result?.length) {
        return [];
      }
      return result.map(MilitaryFamilyMembersModel.fromObject);
    } catch (error) {
      console.error(
        "Error al obtener miembros de la familia militar por ID de encuestado:",
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
        `SELECT * FROM military_family_members WHERE id = ?;`,
        [id]
      );
      return MilitaryFamilyMembersModel.fromObject(result);
    } catch (error) {
      console.error(
        "Error al obtener miembro de la familia militar por ID:",
        error.message
      );
      return null;
    }
  }

  async delete(id) {
    try {
      await this.db.runAsync(
        `DELETE FROM military_family_members WHERE id = ?;`,
        [id]
      );
      console.log("Eliminación completada exitosamente.");
    } catch (error) {
      console.error(
        "Error al eliminar miembro de la familia militar por ID:",
        error.message
      );
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
