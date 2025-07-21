import { Router } from "express";
import payslipRoutes from "./payslip.routes.js";

const v1Routes = Router();

v1Routes.use('/payslip', payslipRoutes);

export default v1Routes;