import { MotherModel } from '../models/MotherModel';
import { useSQLiteContext } from 'expo-sqlite/next';

export class MotherRepository {
  db;

  constructor(db = useSQLiteContext()) {
    this.db = db;
  }

  async create(mother) {
    try {
      const lastInsertRowId = await new Promise((resolve, reject) => {
        this.db.withTransactionAsync(async () => {
          try {
            console.log('Insertando madre', mother);

            // Consulta SQL para insertar en mother
            const response = await this.db.runAsync(
              `INSERT INTO mother (
                        respondent_id, name, age, occupation, education_level, residence_site, 
                        current_address, phone, spouse
                      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
              [
                mother.respondentId,
                mother.name,
                mother.age,
                mother.occupation,
                mother.educationLevel,
                mother.residenceSite,
                mother.currentAddress,
                mother.phone,
                mother.spouse,
              ]
            );

            resolve(response.lastInsertRowId);
          } catch (error) {
            reject(error);
          }
        });
      });
      console.log('Mother id insertado:', lastInsertRowId);
      return lastInsertRowId;
    } catch (error) {
      console.error('Error al insertar madre:', error.message);
    }
  }

  async findAll() {
    try {
      return await this.db.getAllAsync(`SELECT * FROM mother`);
    } catch (error) {
      console.error('Error al obtener madres:', error.message);
    }
  }

  async findByRespondentId(respondentId) {
    try {
      const result = await this.db.getFirstAsync(
        `SELECT * FROM mother WHERE respondent_id = ?;`,
        [respondentId]
      );

      return MotherModel.fromObject(result);
    } catch (error) {
      console.error(
        'Error al obtener madre por ID de encuestado:',
        error.message
      );
    }
  }
}
