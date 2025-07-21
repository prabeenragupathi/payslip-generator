import { generatePayslip } from "#controllers/v1/payslip.controller.js";
import { Router } from "express";

const payslipRoutes = Router();

payslipRoutes.post("/generate", generatePayslip)

export default payslipRoutes;