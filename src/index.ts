import dotenv from 'dotenv';
import app from "./server";

dotenv.config();

app.listen(8000, () => {
  console.log("Listening on ports 8000");
});
