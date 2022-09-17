import { NextApiRequest, NextApiResponse } from 'next';
import { verifyJwt } from './utils/jwt';
import {prisma} from './utils/prisma'


type CtxUser = {
  id: number,
  username: string,
  email: string,
  password: string,
  iat: string,
  exp: number,
} 


function getUserFromRequest(req: NextApiRequest) {
  const token = req.cookies.token;
  if(token){
    try {
      const verified = verifyJwt<CtxUser>(token);
      return verified;
    } catch (e) {
      return null;
    }
  }
  return null;
}

export function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const user = getUserFromRequest(req);
  return {req, res, user, prisma}
}

export type Context = ReturnType<typeof createContext>;
