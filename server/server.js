import app from "./app.js";
import connection from "./config/connection.js";
import dotenv from "dotenv";

dotenv.config({ path: "config/.env" });

connection();

app.listen(4000, () => {
  console.log(
    `Server started at port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
