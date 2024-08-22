import { useSQLiteContext } from 'expo-sqlite/next';
import { SiblingModel } from '../models/SiblingModel';
export class SiblingsRepository {
  db;

  constructor(db = useSQLiteContext()) {
    this.db = db;
  }

  async create(sibling) {
    try {
      const lastInsertRowId = await new Promise((resolve, reject) => {
        this.db.withTransactionAsync(async () => {
          try {
            console.log('Insertando hermano', sibling);

            // Consulta SQL para insertar en siblings
            const response = await this.db.runAsync(
              `INSERT INTO siblings (
                        respondent_id, name, age, occupation, education_level, residence_site, 
                        current_address, phone, spouse
                      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
              [
                sibling.respondentId,
                sibling.name,
                sibling.age,
                sibling.occupation,
                sibling.educationLevel,
                sibling.residenceSite,
                sibling.currentAddress,
                sibling.phone,
                sibling.spouse,
              ]
            );

            resolve(response.lastInsertRowId);
          } catch (error) {
            reject(error);
          }
        });
      });
      console.log('Siblings id insertado:', lastInsertRowId);
      return lastInsertRowId;
    } catch (error) {
      console.error('Error al insertar hermano:', error.message);
    }
  }

  async findAll() {
    try {
      return await this.db.getAllAsync(`SELECT * FROM siblings`);
    } catch (error) {
      console.error('Error al obtener hermanos:', error.message);
    }
  }

  async findByRespondentId(respondentId) {
    try {
      const result = await this.db.getAllAsync(
        `SELECT * FROM siblings WHERE respondent_id = ?;`,
        [respondentId]
      );
      if (!result?.length) {
        return [];
      }
      return result.map(SiblingModel.fromObject);
    } catch (error) {
      console.error(
        'Error al obtener hermanos por ID de encuestado:',
        error.message
      );
      return [];
    }
  }

  async findOne(findOptions) {
    try {
      const result = await this.db.getFirstAsync(
        `SELECT * FROM siblings WHERE respondent_id = ? AND name = ?;`,
        [findOptions.respondentId, findOptions.name]
      );
      return SiblingModel.fromObject(result);
    } catch (error) {
      console.error(
        'Error al obtener hermano por ID de encuestado y nombre:',
        error.message
      );
    }
  }
}
