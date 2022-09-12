import { appRouter } from "../../../backend/router/app.routes";
import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "../../../backend/createContext";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError({error}){
    if(error.code === 'INTERNAL_SERVER_ERROR'){
      console.error('something went wrong', error);
    }else{
      console.error(error.message);
    }
  }
});