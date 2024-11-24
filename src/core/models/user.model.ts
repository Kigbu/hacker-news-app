export default class User {
  id!: string;
  password!: string;
  full_name!: string;
  email!: string;
  phone_number?: string;
  accessToken!: string;
  passwordSalt!: string;

  constructor(dto: any = null) {
    const organizationData: [] = dto?.userOrganizations || dto?.organizations;
    if (dto) {
      this.id = dto._id;
      this.email = dto.email;
      this.full_name = dto.full_name;
      this.phone_number = dto.phone_number;
      // this.userName = `${dto.first_name} ${dto.last_name}`;
      this.accessToken = dto.accessToken;
    }
  }
}
