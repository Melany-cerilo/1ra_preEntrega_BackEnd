export default class UserDTO {
  constructor(userData) {
    this.email = userData.email;
    this.first_name = userData.first_name;
    this.last_name = userData.last_name;
    this.age = userData.age;
    this._id = userData._id;
    this.role = userData.role;
  }
}
