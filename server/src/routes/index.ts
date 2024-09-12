import userRoutes from "./user.routes";

import { Router } from "express";

export type TRoute = {
  path?: string;
  router: Router;
};

const routes: TRoute[] = [userRoutes];

export default routes;
