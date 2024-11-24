import {sign} from 'react-native-pure-jwt';

export const L = (...args: any) => {
  __DEV__ && console.log(...args);
};

export const priceFormater = (price: number | null | undefined) => {
  if (!price) return 0;
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const stringTruncate = (text: string, length: number) => {
  if (!text) return;
  if (!length || text.length <= length) return text || '';
  return `${text.substring(0, length)} ...`;
};

export const getContentType = (extension: string): string => {
  switch (extension) {
    case 'mp4':
      return 'video/mp4';
    case 'jpeg':
    case 'jpg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    default:
      return 'application/octet-stream';
  }
};

export const formatNumberToDecimal = (num: number) => {
  // Check if the number has a decimal part
  if (num % 1 !== 0) {
    // Round to two decimal places if necessary
    return parseFloat(num.toFixed(2));
  } else {
    // Return the number as is if there are no decimals
    return num;
  }
};

export const generateSalt = (length = 16) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let salt = '';
  for (let i = 0; i < length; i++) {
    salt += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return salt;
};

export const hashPassword = (password: string, salt: string) => {
  const textToHash = password + salt;

  // Simple hash function (not cryptographically secure for production)
  let hash = 0;
  for (let i = 0; i < textToHash.length; i++) {
    const char = textToHash.charCodeAt(i);
    hash = (hash << 5) - hash + char; // Bitwise operations
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
};

export const verifyPassword = (
  inputPassword: string,
  storedSalt: string,
  storedHash: string,
) => {
  const inputHash = hashPassword(inputPassword, storedSalt);
  return inputHash === storedHash;
};

export const mySecretKey = 'my-jwt-secret-key';

export const generateAuthentication = (user: any) => {
  const token = sign(
    {
      id: user.id,
      email: user.email,
    },
    mySecretKey,
    {alg: 'HS256'},
  );
  return token;
};
