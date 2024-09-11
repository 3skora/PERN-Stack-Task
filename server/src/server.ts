import * as app from "./app";

app.testDatabase();
app.initializeMiddlewares();
// app.seedDatabase();
app.syncDatabase();
app.listen();
