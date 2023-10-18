enum Role {
  REGULAR = 'REGULAR',
  CREATOR = 'CREATOR',
  ADMIN = 'ADMIN'
}
export const roles = [
  {
    name: 'Uczestnik',
    role: Role.REGULAR
  },
  {
    name: 'Twórca',
    role: Role.CREATOR
  },
  {
    name: 'Administrator',
    role: Role.ADMIN
  },
]
export default Role;
