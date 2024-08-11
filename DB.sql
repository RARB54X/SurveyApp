-- 1. create DB
sqlite3 mySQLiteDB.db

-- 2. create tables

CREATE TABLE IF NOT EXISTS Encuestador (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  cedula TEXT NOT NULL
  fechaEncuesta DATE
);

CREATE TABLE IF NOT EXISTS Encuestado (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombreEncuestado TEXT NOT NULL,
  apellidoEncuestado TEXT NOT NULL,
  mandoElabora TEXT,
  seudonimo TEXT,
  fechaNacEncuestado DATE,
  edadEncuestado TEXT,
  tipoDocumentoEncuestado TEXT,
  cedulaEncuestado TEXT ,
  numeroIdEncuestado TEXT,
  lugarNacEncuestado TEXT,
  lugarVivencuestado TEXT,
  EstudioEncuestado  TEXT,
  ProfesionOcupEncuestado TEXT,
  EstadoCivilEncuestado TEXT,
  DatosIncorpEnscuestaso TEXT,
  FechaIncorpEncuestado TEXT,
  LugarIncorpEncuestado TEXT,
  QuienIncorpEncuestado TEXT,
  MandoRecibioEncuestado TEXT,
  EstrucIncopEncuestado TEXT,
  OtraEstrucEncuestado TEXT,
  MandoCargoEncuestado TEXT,
  TiempoPerEncuestado TEXT,
  TareasEncuestado TEXT,
  PorqueIncorpEncuestado TEXT,
  EnfermPadEncuestado TEXT,
  FamiliaACEncuestado TEXT,
  HaPer

);
-- 3. insert data
INSERT INTO Encuestador (name, cedula) VALUES ('pablo', '123');
INSERT INTO Encuestador (name, cedula) VALUES ('pedro', '3245');

-- 4. confirm data was inserted
select * from Encuestador;

-- 6. exit db
.quit