import * as app from "./app";
import routes from "./routes";

app.testDatabase();
app.initializeMiddlewares();
app.initializeRoutes(routes);
// app.seedDatabase();
app.syncDatabase();
app.listen();
