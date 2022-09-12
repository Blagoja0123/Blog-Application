import { createReactQueryHooks } from '@trpc/react';
import { AppRouter } from '../backend/router/app.routes';
export const trpc = createReactQueryHooks<AppRouter>();