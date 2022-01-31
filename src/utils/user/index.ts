import bcrypt from 'bcryptjs';

export const hashPass = (password: string) => {
  const bcryptSalt = 10;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  return bcrypt.hashSync(password, salt);
}