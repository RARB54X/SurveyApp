export async function migrateDbIfNeeded(db) {
  const DATABASE_VERSION = 1;
  let { user_version: currentDbVersion } = await db.getFirstAsync(
    'PRAGMA user_version'
  );
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE IF NOT EXISTS father (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  respondent_id INTEGER,
  name TEXT,
  age TEXT,
  occupation TEXT,
  education_level TEXT,
  residence_site TEXT,
  current_address TEXT,
  phone TEXT,
  spouse TEXT,  
  FOREIGN KEY (respondent_id) REFERENCES respondents(id)
);
  `);
    await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE IF NOT EXISTS mother (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  respondent_id INTEGER,
  name TEXT,
  age TEXT,
  occupation TEXT,
  education_level TEXT,
  residence_site TEXT,
  current_address TEXT,
  phone TEXT,
  spouse TEXT,  
  FOREIGN KEY (respondent_id) REFERENCES respondents(id)
);
  `);
    await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE IF NOT EXISTS children (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  respondent_id INTEGER,
  name TEXT,
  age TEXT,
  occupation TEXT,
  education_level TEXT,
  residence_site TEXT,
  current_address TEXT,
  phone TEXT,
  spouse TEXT,  
  FOREIGN KEY (respondent_id) REFERENCES respondents(id)
);
  `);
    await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE IF NOT EXISTS siblings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  respondent_id INTEGER,
  name TEXT,
  age TEXT,
  occupation TEXT,
  education_level TEXT,
  residence_site TEXT,
  current_address TEXT,
  phone TEXT,
  spouse TEXT,  
  FOREIGN KEY (respondent_id) REFERENCES respondents(id)
);
  `);
    await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE IF NOT EXISTS spouse (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  respondent_id INTEGER,
  name TEXT,
  age TEXT,
  occupation TEXT,
  education_level TEXT,
  residence_site TEXT,
  current_address TEXT,
  phone TEXT,
  spouse TEXT,
  relationship_status TEXT,  
  FOREIGN KEY (respondent_id) REFERENCES respondents(id)
);
  `);
    await db.execAsync(`
PRAGMA journal_mode = 'wal';      
CREATE TABLE IF NOT EXISTS education (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  respondent_id INTEGER,
  training_type TEXT,
  training_duration TEXT,
  year_of_completion TEXT,
  structure TEXT,
  FOREIGN KEY (respondent_id) REFERENCES respondents(id)
);
  `);
    await db.execAsync(`
PRAGMA journal_mode = 'wal';    
CREATE TABLE IF NOT EXISTS action (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  respondent_id INTEGER,
  action_type TEXT,
  commanding_officer TEXT,
  year_of_completion TEXT,
  structure TEXT,
  FOREIGN KEY (respondent_id) REFERENCES respondents(id)
);
  `);
    await db.execAsync(`
PRAGMA journal_mode = 'wal';    
CREATE TABLE IF NOT EXISTS specialties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  respondent_id INTEGER,
  specialty_type TEXT,
  duration TEXT,
  structure TEXT,
  FOREIGN KEY (respondent_id) REFERENCES respondents(id)
);
  `);
    await db.execAsync(`
PRAGMA journal_mode = 'wal';    
CREATE TABLE IF NOT EXISTS sanctions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  respondent_id INTEGER,
  reason TEXT,
  sanctioned_by TEXT,
  sanction_type TEXT,
  date TEXT,
  sanction_duration TEXT,
  structure TEXT,
  FOREIGN KEY (respondent_id) REFERENCES respondents(id)
);
  `);
    await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE IF NOT EXISTS NonMilitary_family_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  respondent_id INTEGER,
  family_type TEXT,
  name TEXT,
  age TEXT,
  rank TEXT,
  structure TEXT,
  duration TEXT,
  current_status TEXT,
  FOREIGN KEY (respondent_id) REFERENCES respondents(id)
);
  `);
    await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE IF NOT EXISTS properties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  respondent_id INTEGER,
  location TEXT,
  FOREIGN KEY (respondent_id) REFERENCES respondents(id)
);
  `);
    await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE IF NOT EXISTS security_questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  respondent_id INTEGER,
  reason_for_capture TEXT,
  captured_by TEXT,
  capture_date TEXT,
  capture_location TEXT,
  prison_name TEXT,
  prison_duration TEXT,
  release_method TEXT,
  military_service_start TEXT,
  military_service_location TEXT,
  military_service_end TEXT,
  other_organization TEXT,
  other_organization_duration TEXT,
  reason_for_leaving_organization TEXT,
  has_military_friends TEXT,
  FOREIGN KEY (respondent_id) REFERENCES respondents(id)
);
  `);

    await db.execAsync(`
PRAGMA journal_mode = 'wal';    
CREATE TABLE IF NOT EXISTS general_questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  respondent_id INTEGER,
  aspiration_in_5_years TEXT,
  how_has_feeling TEXT,
  feels_better_in_civil TEXT,
  what_do_you_miss_from_civil TEXT,
  what_is_best_at TEXT,
  what_you_enjoy_most TEXT,
  main_problem TEXT,
  main_success TEXT,
  main_failure TEXT,
  prepared_for_disability TEXT,
  prepared_for_capture TEXT,
  physical_signs_or_defects TEXT,
  STIs TEXT,
  treatment_received TEXT,
  current_illnesses TEXT,
  had_any_surgeries TEXT,
  observations TEXT,
  has_military_friends TEXT,
  FOREIGN KEY (respondent_id) REFERENCES respondents(id)
);
  `);
    await db.execAsync(`
PRAGMA journal_mode = 'wal';

CREATE TABLE IF NOT EXISTS military_family_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  respondent_id INTEGER,
  family_type_in_military TEXT,
  family_name_in_military TEXT,
  family_age_in_military TEXT,
  family_profession_in_military TEXT,
  time_in_military TEXT,
  family_rank TEXT,
  family_unit TEXT,
  family_service_location TEXT,
  FOREIGN KEY (respondent_id) REFERENCES respondents(id)
);
  `);
    await db.execAsync(`
PRAGMA journal_mode = 'wal';

CREATE TABLE IF NOT EXISTS other_questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  respondent_id INTEGER,
  lived_with_first_7_years TEXT,
  punishment_method TEXT,
  reward_method TEXT,
  childhood_aspiration TEXT,
  current_aspiration TEXT,
  relationship_with_father TEXT,
  relationship_with_mother TEXT,
  relationship_with_siblings TEXT,
  has_stable_partner TEXT,
  time_with_partner TEXT,
  relationship_with_partner TEXT,
  age_of_first_sexual_relationship TEXT,
  current_situation TEXT,
  affection_demonstration TEXT,
  in_love TEXT,
  fears TEXT,
  biggest_fear TEXT,
  greatest_joy TEXT,
  response_to_offense_or_attack TEXT,
  FOREIGN KEY (respondent_id) REFERENCES respondents(id)
);
  `);

    await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE IF NOT EXISTS respondents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_interviewer TEXT,
  id_card_interviewer TEXT,
  date_interviewer DATE DEFAULT (date('now')),
  first_name TEXT NOT NULL,
  last_name TEXT,
  supervisor_elaborates TEXT,
  nickname TEXT,
  birth_date DATE,
  age TEXT,
  document_type TEXT,
  id_number TEXT,
  place_of_birth TEXT,
  place_of_residence TEXT,
  education TEXT,
  profession_occupation TEXT,
  marital_status TEXT,
  incorporation_date TEXT,
  incorporation_place TEXT,
  who_incorporated TEXT,
  received_supervisor TEXT,
  incorporation_structure TEXT,
  other_structure TEXT,
  position_supervisor TEXT,
  duration TEXT,
  tasks TEXT,
  reason_for_incorporation TEXT,
  parental_illness TEXT,
  family_agreement TEXT,
  has_previous_experience TEXT
);
    `);
    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
