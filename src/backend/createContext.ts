import { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from './utils/prisma'


/* type CtxUser = {
  username: string;
  password: string;
} | null

function getUserFromRequest(req: NextApiRequest) {
  const temp = <CtxUser>(req.body);
  return temp;
} */

export function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  //const user = getUserFromRequest(req);
  return {req, res, prisma}
}

export type Context = ReturnType<typeof createContext>;
