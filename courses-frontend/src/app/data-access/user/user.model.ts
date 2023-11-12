import Role from "../role/role.enum";
interface User {
  id: string,
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  role: Role
}
export default User;
