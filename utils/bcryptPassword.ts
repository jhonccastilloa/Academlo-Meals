import bcryptjs from "bcryptjs";

const encrypt = async (passwordPlain:string) => {
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(passwordPlain, salt);
  return hash;
};
const compareEncrypt = async (passwordPlain:string, hashPassword:string) => {

  const isAuth = await bcryptjs.compare(passwordPlain, hashPassword);
  
  return isAuth;
};

export { encrypt, compareEncrypt };
