import express from "express";
import customerRoutes from "./routes/customer";
import restaurantRoutes from "./routes/restaurant";
import tableRoutes from "./routes/table";
import reservationRoutes from "./routes/reservation";
import error from "./middleware/error";

const app = express();
app.use(express.json());

app.use("/api/customers", customerRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/reservations", reservationRoutes);
app.use(error);

export default app;
