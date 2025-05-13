import { authRouter } from '@/modules/auth/server/procedures';
import { createTRPCRouter } from '../init';
import { categoriesRouter } from '@/modules/categories/server/procedures';
import { productsRouter } from '@/modules/Products/server/procedures';
import { tagsRouter } from '@/modules/tags/server/procedures';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  tags: tagsRouter,
  products: productsRouter,
  categories: categoriesRouter,
});

export type AppRouter = typeof appRouter;