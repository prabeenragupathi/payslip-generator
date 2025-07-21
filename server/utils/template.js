import fs from "fs/promises";
import path from "path";
import { ToWords } from "to-words";
import { fileURLToPath } from "url";

const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      // can be used to override defaults for the selected locale
      name: "Rupee",
      plural: "Rupees",
      symbol: "₹",
      fractionalUnit: {
        name: "Paisa",
        plural: "Paise",
        symbol: "",
      },
    },
  },
});

export async function generateBWPayslip(data) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const templatePath = path.join(
    __dirname,
    "..",
    "templates",
    "bw-template.html"
  );

  let template = await fs.readFile(templatePath, "utf8");

  
    // Calculate prorated salary based on days payable
    const daysRatio = data.attendance.daysPayable && data.attendance.totalWorkingDays
      ? Number(data.attendance.daysPayable) / Number(data.attendance.totalWorkingDays)
      : 1;

    const proratedSalary = {
      basic: (Number(data.salary.basic) || 0) * daysRatio,
      hra: (Number(data.salary.hra) || 0) * daysRatio,
      conveyance: (Number(data.salary.conveyance) || 0) * daysRatio,
      shiftAllowance: (Number(data.salary.shiftAllowance) || 0) * daysRatio,
      bonusAllowance: (Number(data.salary.bonusAllowance) || 0) * daysRatio,
      specialAllowance: (Number(data.salary.specialAllowance) || 0) * daysRatio,
      otherEarnings: (Number(data.salary.otherEarnings) || 0) * daysRatio,
    };

    const grossSalary = (
      proratedSalary.basic +
      proratedSalary.hra +
      proratedSalary.conveyance +
      proratedSalary.shiftAllowance +
      proratedSalary.bonusAllowance +
      proratedSalary.specialAllowance +
      proratedSalary.otherEarnings
    );

    // Prorate deductions based on gross salary (adjustable based on policy)
    const proratedContributions = {
      pf: (Number(data.contributions.pf) || 0) * daysRatio,
      esi: (Number(data.contributions.esi) || 0) * daysRatio,
    };

    const totalDeductions = proratedContributions.pf + proratedContributions.esi;
    const netPay = grossSalary - totalDeductions;

  const netPayInWords = toWords.convert(netPay);

  // Current date for pay period and pay date
  const currentDate = new Date();

  const companyAddress = `${data.company.address}, ${data.company.city}, ${data.company.state}-${data.company.pincode}`;
  // Replace placeholders with data
  const replacements = {
    COMPANY_NAME: data.company.name,
    COMPANY_ADDRESS: companyAddress,
    EMPLOYEE_NAME: data.employee.name || "-",
    EMPLOYEE_NUMBER: data.employee.number || "-",
    DATE_OF_JOINING: data.employee.dateJoined || "-",
    DEPARTMENT: data.employee.department || "-",
    SUB_DEPARTMENT: data.employee.subDepartment || "-",
    DESIGNATION: data.employee.designation || "-",
    PAYMENT_MODE: data.employee.paymentMode || "-",
    BANK_NAME: data.employee.bankName || "-",
    BANK_IFSC: data.employee.bankIfsc || "-",
    BANK_ACCOUNT_NUMBER: data.employee.bankAccountNo || "-",
    UAN_NUMBER: data.employee.uan || "-",
    PF_NUMBER: data.employee.pfNumber || "-",
    ESI_NUMBER: data.employee.esiNumber || "-",
    PAN_NUMBER: data.employee.panNumber || "-",
    ACTUAL_PAYABLE_DAYS: data.attendance.actualDays,
    TOTAL_WORKING_DAYS: data.attendance.totalWorkingDays,
    LOSS_OF_PAY_DAYS: data.attendance.lossOfPay,
    DAYS_PAYABLE: data.attendance.daysPayable,
    BASIC_SALARY: Number(data.salary.basic) || 0,
    HRA: Number(data.salary.hra) || 0,
    CONVEYANCE_ALLOWANCE: Number(data.salary.conveyance) || 0,
    SHIFT_ALLOWANCE: Number(data.salary.shiftAllowance) || 0,
    BONUS_ALLOWANCE: Number(data.salary.bonusAllowance) || 0,
    SPECIAL_ALLOWANCE: Number(data.salary.specialAllowance) || 0,
    OTHER_EARNINGS: Number(data.salary.otherEarnings) || 0,
    PF_DEDUCTION: Number(data.contributions.pf) || 0,
    ESI_DEDUCTION: Number(data.contributions.esi) || 0,
    GROSS_SALARY: grossSalary.toFixed(2),
    TOTAL_DEDUCTIONS: totalDeductions.toFixed(2),
    NET_PAY: netPay.toFixed(2),
    NET_PAY_IN_WORDS: netPayInWords,
  };

  // Replace placeholders in the template
  for (const [key, value] of Object.entries(replacements)) {
    template = template.replace(`{{${key}}}`, String(value));
  }

  // Update payslip title with current month
  const month = currentDate
    .toLocaleString("default", { month: "long" })
    .toUpperCase();
  template = template.replace(
    '<div class="payslip-title"></div>',
    `<div class="payslip-title">PAY SLIP FOR THE MONTH OF ${month}</div>`
  );

  return template;
}
