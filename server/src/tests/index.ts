import * as app from "../app";
import routes from "../routes";

export const setupTestApp = async () => {
  app.initializeMiddlewares();
  app.initializeRoutes(routes);
  await app.syncDatabase();
  //   return app.app;
};
