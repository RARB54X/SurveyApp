export class PropertiesModel {
  id; // Asumido como el campo de identificación
  location;

  static fromObject(data) {
    const properties = new PropertiesModel();
    properties.id = data.id;
    properties.location = data.location;

    return properties;
  }
}
