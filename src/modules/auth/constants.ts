export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'super_secrect_2',
  expiresIn: String(process.env.JWT_EXPIRES_IN) || '10d',
};
