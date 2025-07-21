# Payslip Generator

A full-stack web application for generating employee payslips in PDF format. The frontend, built with React and Formik, allows users to input employee, salary, and attendance details, while the backend, built with Node.js, Express, and TypeScript, processes the data to generate a formatted payslip PDF using Puppeteer. The application supports prorated salary calculations based on payable days and is deployable on Vercel for both frontend and backend.

## Features

- **Dynamic Form Input**: User-friendly form with validation for employee details, salary components, contributions, and attendance data.
- **Prorated Salary Calculation**: Automatically adjusts salary components based on `DAYS_PAYABLE` and `TOTAL_WORKING_DAYS`.
- **PDF Generation**: Generates A4-sized payslip PDFs with a professional layout using a customizable HTML template.
- **Indian Numbering System**: Converts net pay to words (e.g., "Thirty Nine Thousand Nine Hundred Fifteen and Seven Paise Rupees Only") for Indian payroll compliance.
- **Responsive Design**: Frontend form and payslip template are responsive for desktop and mobile devices.
- **CORS Support**: Backend configured for cross-origin requests, suitable for deployment on Vercel or other platforms.
- **TypeScript Support**: Ensures type safety and maintainability in the backend.
- **Vercel Deployment**: Backend can be deployed as serverless functions with Puppeteer integration via `chrome-aws-lambda`.

## Project Structure

```
payslip-generator/
├── server/                          # Backend source code
│   ├── controllers/
│   │   └── v1/payslip.controller.ts # API controller for payslip generation
│   ├── utils/
│   │   ├── numberToWords.ts         # Converts numbers to Indian words format
│   │   └── template.ts              # Generates HTML for payslip
│   ├── templates/
│   │   └── payslipTemplate.html     # HTML template for payslip
│   ├── index.ts                     # Express server entry point
│   ├── package.json                 # Backend dependencies and scripts
│   └── tsconfig.json                # TypeScript configuration
├── client/                             # Frontend source code
│   └── src                          # Contains the source file
├── vercel.json                      # Vercel configuration
├── package.json                     # Frontend dependencies and scripts
└── README.md                        # Project documentation
```

## Prerequisites

- **Node.js**: Version 18.x or higher
- **npm**: Version 8.x or higher
- **Git**: For cloning the repository
- **Vercel CLI**: For deployment (optional)
- **Browser**: Chrome, Firefox, or Edge for testing
- **Text Editor**: VS Code or similar for editing code

## Installation

### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Compile TypeScript to JavaScript:
   ```bash
   npm run build
   ```
4. Ensure the template file exists at `server/templates/payslipTemplate.html`.

### Frontend Setup
1. Navigate to the project root (assuming frontend is in the root directory):
   ```bash
   cd payslip-generator
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file for environment variables:
   ```env
   REACT_APP_API_URL=http://localhost:3000/api/payslip/generate
   ```

## Usage

### Running Locally
1. **Start the Backend**:
   ```bash
   cd server
   npm start
   ```
   The backend will run on `http://localhost:3000`.

2. **Start the Frontend**:
   ```bash
   cd payslip-generator
   npm start
   ```
   The frontend will run on `http://localhost:3000` (or another port if configured differently).

3. Open your browser and navigate to the frontend URL (e.g., `http://localhost:3000`).
4. Fill out the form with employee, salary, contributions, and attendance details.
5. Click "Generate Payslip" to download the payslip PDF.

### Form Fields
- **Employee Details**: Name, Employee Number, Date Joined, Department, Designation, Payment Mode, Bank Details, UAN, PF Number, ESI Number, PAN Number.
- **Salary Details**: Basic Salary, HRA, Conveyance Allowance, Shift Allowance, Bonus Allowance, Special Allowance, Other Earnings.
- **Contributions**: Provident Fund (PF), Employee State Insurance (ESI).
- **Attendance Details**: Actual Payable Days, Total Working Days, Loss of Pay Days, Days Payable (calculated as `Actual Payable Days - Loss of Pay Days`).

### Salary Calculation
- Salary components are prorated based on the ratio `DAYS_PAYABLE / TOTAL_WORKING_DAYS`.
- Example:
  - Input: `basic=30000`, `hra=15000`, `totalWorkingDays=30`, `daysPayable=25`
  - Prorated: `basic = 30000 * (25/30) = 24999`, `hra = 15000 * (25/30) = 12499.5`
  - Gross Salary: Sum of prorated components
  - Net Pay: Gross Salary minus deductions (PF, ESI)


## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact

For issues or feature requests, please open an issue on the [GitHub repository](https://github.com/your-username/payslip-generator).
