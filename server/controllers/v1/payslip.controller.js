import { generateBWPayslip } from "#utils/template.js";
import { catcher } from "#utils/asynHandler.js";
import puppeteer from "puppeteer";

export const generatePayslip = catcher(async (req, res) => {
  const data = req.body;

  // Generate HTML from template with data
  const htmlContent = await generateBWPayslip(data);

  // Launch Puppeteer and generate PDF
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await browser.close();

  // Send PDF response
  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=${data.employee.name}-${new Date().toLocaleString('default',{month:'long'})}-payslip.pdf`,
  });
  res.send(pdfBuffer);
});
