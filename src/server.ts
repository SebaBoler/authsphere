import { app } from "./app";
import envVar from "env-var";

const PORT: number = envVar.get("PORT").default("3000").asInt();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
