import express,{Express} from "express";
import cors from "cors";
import "dotenv/config";
import juegosAdquiridosRoutes from "./interfaces/routes/juegosAdquiridosRoutes"
import coollectionRoutes from "./interfaces/routes/collectionsRoutes"


const app:Express=express();
app.use(cors());
app.use(express.json());

const Port=process.env.PORT || 3002;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/games",juegosAdquiridosRoutes)
app.use("/api/collection",coollectionRoutes)

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
