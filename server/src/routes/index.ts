import userRoutes from "./user.routes";
import matchRoutes from "./match.routes";

import { Router } from "express";

export type TRoute = {
  path?: string;
  router: Router;
};

const routes: TRoute[] = [userRoutes, matchRoutes];

export default routes;
