import {
  generateAuthentication,
  generateSalt,
  hashPassword,
  mySecretKey,
  verifyPassword,
} from 'utils/helpers';
import localStorage, {storageKeys} from '../config/storage';
import User from '../models/user.model';
import {uniqueId} from 'lodash';
// import JWT from 'jsonwebtoken';
import {jwtDecode} from 'jwt-decode';

const getCurrentUserProfile = async (token: any) => {
  if (!token) return {success: false, user: null};

  const _decode: any = jwtDecode(token);

  let db: any[] =
    JSON.parse(await localStorage.getItem(storageKeys.USER_DB)) ?? [];

  const db_User = db.find(x => x.email === _decode?.email);
  console.log('userExits :>> ', JSON.stringify(db_User, null, 4));
  if (!db_User)
    return {
      success: false,
      message: `User with ${_decode?.email} does not exists!`,
    };

  console.log('_decode :>> ', _decode);

  return {success: true, user: db_User};
};

// const getUserDetails = async (client: any, id: number): Promise<User> => {
//   const { ok, data }: any = await client.get(`${ENDPOINT}?UserId=${id}`);
//   if (ok && data) return new User(data.data);
//   else return new User(null);
// };

const resiterUser = async (reqBody: any) => {
  try {
    const {full_name, email, password} = reqBody;

    const _salt = generateSalt();

    const cleanName = full_name.toLowerCase().trim();
    const cleanEmail = email.toLowerCase().trim();
    const hashedPassword = hashPassword(password, _salt);

    let db: any[] =
      JSON.parse(await localStorage.getItem(storageKeys.USER_DB)) ?? [];

    // if (db !== null)
    const userExits = db.find(x => x.email === cleanEmail);
    console.log('userExits :>> ', userExits);
    if (userExits)
      return {
        success: false,
        message: `User with ${cleanEmail} already exists!`,
      };

    const new_user: User = {
      id: uniqueId(),
      full_name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
      passwordSalt: _salt,
      accessToken: '',
    };

    db.push(new_user);

    await localStorage.setItem(storageKeys.USER_DB, JSON.stringify(db));

    const access_token = generateAuthentication(new_user);

    return {success: true, user: new_user, access_token: access_token};
  } catch (error) {
    console.log('error :>> ', error);
  }
};

const loginUser = async (reqBody: any) => {
  try {
    const {email, password} = reqBody;

    const cleanEmail = email.toLowerCase().trim();

    let db: any[] =
      JSON.parse(await localStorage.getItem(storageKeys.USER_DB)) ?? [];

    // if (db !== null)
    const db_User = db.find(x => x.email === cleanEmail);
    console.log('userExits :>> ', JSON.stringify(db_User, null, 4));
    if (!db_User)
      return {
        success: false,
        message: `User with ${cleanEmail} does not exists!`,
      };

    const _verifyPassword = verifyPassword(
      password,
      db_User.passwordSalt,
      db_User.password,
    );

    if (!_verifyPassword)
      return {
        success: false,
        message: `Invalid login credentials`,
      };

    const access_token = generateAuthentication(db_User);

    return {success: true, user: db_User, access_token: access_token};
  } catch (error) {
    console.log('error :>> ', error);
  }
};

const userService = {
  getCurrentUserProfile,
  resiterUser,
  loginUser,
};

export default userService;
