import express from "express";
import customerRoutes from "./routes/customer";
import restaurantRoutes from "./routes/restaurant";
import tableRoutes from "./routes/table";
import reservationRoutes from "./routes/reservation";
import error from "./middleware/error";

const app = express();
app.use(express.json());

app.use("/customers", customerRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/tables", tableRoutes);
app.use("/reservations", reservationRoutes);

app.use(error);

export default app;
