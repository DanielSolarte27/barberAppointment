import { AppDataSource } from "./config/data-source";
import { PORT } from "./config/envs";
import app from "./server";

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected...');
    app.listen(PORT, () => {
      console.log(`Server Listening on PORT ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

