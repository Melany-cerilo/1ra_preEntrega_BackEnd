export default class CurrentDTO {
  constructor(userData) {
    this.email = userData.email;
    this.firstName = userData.first_name;
    this.lastName = userData.last_name;
    this.age = userData.age;
  }
}
