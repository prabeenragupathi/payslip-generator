import{ useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object({
  employee: Yup.object({
    name: Yup.string().required("Required"),
    number: Yup.string().required("Required"),
    dateJoined: Yup.date().required("Required"),
    department: Yup.string().required("Required"),
    subDepartment: Yup.string(),
    designation: Yup.string().required("Required"),
    paymentMode: Yup.string().required("Required"),
    bankName: Yup.string().required("Required"),
    bankIfsc: Yup.string().required("Required"),
    bankAccountNo: Yup.string().required("Required"),
    uan: Yup.string(),
    pfNumber: Yup.string(),
    esiNumber: Yup.string(),
    panNumber: Yup.string().required("Required"),
  }),
  salary: Yup.object({
    basic: Yup.number().required("Required").min(0),
    hra: Yup.number().required("Required").min(0),
    conveyance: Yup.number().required("Required").min(0),
    shiftAllowance: Yup.number().min(0),
    bonusAllowance: Yup.number().min(0),
    specialAllowance: Yup.number().min(0),
    otherEarnings: Yup.number().min(0),
  }),
  contributions: Yup.object({
    pf: Yup.number().min(0),
    esi: Yup.number().min(0),
  }),
  attendance: Yup.object({
    actualDays: Yup.number().required("Required").min(0).max(31),
    totalWorkingDays: Yup.number().required("Required").min(0).max(31),
    lossOfPay: Yup.number().min(0),
    daysPayable: Yup.number().min(0),
  }),
  company: Yup.object({
    name: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    pincode: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
  }),
});

const PayslipForm = () => {
  const [pdfUrl, setPdfUrl] = useState<any>(null);

  const initialValues = {
    company: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      email: "",
    },
    employee: {
      name: "",
      number: "",
      dateJoined: "",
      department: "",
      subDepartment: "",
      designation: "",
      paymentMode: "",
      bankName: "",
      bankIfsc: "",
      bankAccountNo: "",
      uan: "",
      pfNumber: "",
      esiNumber: "",
      panNumber: "",
    },
    salary: {
      basic: "",
      hra: "",
      conveyance: "",
      shiftAllowance: "",
      bonusAllowance: "",
      specialAllowance: "",
      otherEarnings: "",
    },
    contributions: {
      pf: "",
      esi: "",
    },
    attendance: {
      actualDays: "30",
      totalWorkingDays: "30",
      lossOfPay: "",
      daysPayable: "",
    },
  };
  type PayslipFormValues = typeof initialValues;

  const handleSubmit = async (values: PayslipFormValues) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/payslip/generate",
        values,
        {
          responseType: "blob",
        }
      );

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      alert("Payslip generated successfully.");
    } catch (error) {
      console.error("Error generating payslip:", error);
      alert("Failed to generate payslip. Please try again.");
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 38 || e.keyCode === 40) {
      e.preventDefault();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Payslip Generator
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched }: any) => (
            <Form>
              {/* Company Details */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Company Details
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Name
                    </label>
                    <Field
                      name="company.name"
                      className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.company?.name && touched.company?.name && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.company.name}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Address
                    </label>
                    <Field
                      name="company.address"
                      className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.company?.address && touched.company?.address && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.company.address}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      City
                    </label>
                    <Field
                      name="company.city"
                      className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.company?.city && touched.company?.city && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.company.city}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      State
                    </label>
                    <Field
                      name="company.state"
                      className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.company?.state && touched.company?.state && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.company.state}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Pincode
                    </label>
                    <Field
                      name="company.pincode"
                      className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.company?.pincode && touched.company?.pincode && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.company.pincode}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Phone
                    </label>
                    <Field
                      name="company.phone"
                      className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.company?.phone && touched.company?.phone && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.company.phone}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Email
                    </label>
                    <Field
                      name="company.email"
                      className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.company?.email && touched.company?.email && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.company.email}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Employee Details */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Employee Details
                  </h2>
                  {/* <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    onClick={() => {
                      setFieldValue("employee.subDepartment", "");
                      setFieldValue("employee.uan", "");
                      setFieldValue("employee.pfNumber", "");
                      setFieldValue("employee.esiNumber", "");
                    }}
                  >
                    + Add Optional Fields
                  </button> */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Name
                    </label>
                    <Field
                      name="employee.name"
                      className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.employee?.name && touched.employee?.name && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.employee.name}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Employee Number
                    </label>
                    <Field
                      name="employee.number"
                      className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.employee?.number && touched.employee?.number && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.employee.number}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Date Joined
                    </label>
                    <Field
                      name="employee.dateJoined"
                      type="date"
                      className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.employee?.dateJoined &&
                      touched.employee?.dateJoined && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.employee.dateJoined}
                        </div>
                      )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Department
                    </label>
                    <Field
                      name="employee.department"
                      className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.employee?.department &&
                      touched.employee?.department && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.employee.department}
                        </div>
                      )}
                  </div>
                  {values.employee.subDepartment !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Sub-Department
                      </label>
                      <Field
                        name="employee.subDepartment"
                        className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Designation
                    </label>
                    <Field
                      name="employee.designation"
                      className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.employee?.designation &&
                      touched.employee?.designation && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.employee.designation}
                        </div>
                      )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Payment Mode
                    </label>
                    <Field
                      as="select"
                      name="employee.paymentMode"
                      className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Cash">Cash</option>
                      <option value="UPI">UPI</option>
                    </Field>
                    {errors.employee?.paymentMode &&
                      touched.employee?.paymentMode && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.employee.paymentMode}
                        </div>
                      )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Bank Name
                    </label>
                    <Field
                      name="employee.bankName"
                      className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.employee?.bankName &&
                      touched.employee?.bankName && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.employee.bankName}
                        </div>
                      )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Bank IFSC Code
                    </label>
                    <Field
                      name="employee.bankIfsc"
                      className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.employee?.bankIfsc &&
                      touched.employee?.bankIfsc && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.employee.bankIfsc}
                        </div>
                      )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Bank Account No
                    </label>
                    <Field
                      name="employee.bankAccountNo"
                      className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.employee?.bankAccountNo &&
                      touched.employee?.bankAccountNo && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.employee.bankAccountNo}
                        </div>
                      )}
                  </div>
                  {values.employee.uan !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        UAN
                      </label>
                      <Field
                        name="employee.uan"
                        className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                  {values.employee.pfNumber !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        PF Number
                      </label>
                      <Field
                        name="employee.pfNumber"
                        className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                  {values.employee.esiNumber !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        ESI Number
                      </label>
                      <Field
                        name="employee.esiNumber"
                        className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      PAN Number
                    </label>
                    <Field
                      name="employee.panNumber"
                      className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.employee?.panNumber &&
                      touched.employee?.panNumber && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.employee.panNumber}
                        </div>
                      )}
                  </div>
                </div>
              </div>

              {/* Salary Details */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Salary Details
                  </h2>
                  {/* <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    onClick={() => {
                      setFieldValue("salary.shiftAllowance", 0);
                      setFieldValue("salary.bonusAllowance", 0);
                      setFieldValue("salary.specialAllowance", 0);
                      setFieldValue("salary.otherEarnings", 0);
                    }}
                  >
                    + Add Optional Fields
                  </button> */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Basic Salary
                    </label>
                    <Field
                      name="salary.basic"
                      type="number"
                      className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                      onWheel={(e: any) => e.currentTarget.blur()}
                      onKeyDown={handleKeyDown}
                    />
                    {errors.salary?.basic && touched.salary?.basic && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.salary.basic}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      HRA
                    </label>
                    <Field
                      name="salary.hra"
                      type="number"
                      className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                      onWheel={(e: any) => e.currentTarget.blur()}
                      onKeyDown={handleKeyDown}
                    />
                    {errors.salary?.hra && touched.salary?.hra && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.salary.hra}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Conveyance Allowance
                    </label>
                    <Field
                      name="salary.conveyance"
                      type="number"
                      className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                      onWheel={(e: any) => e.currentTarget.blur()}
                      onKeyDown={handleKeyDown}
                    />
                    {errors.salary?.conveyance &&
                      touched.salary?.conveyance && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.salary.conveyance}
                        </div>
                      )}
                  </div>
                  {values.salary.shiftAllowance !== undefined && (
                    <div>
                      <label className="block text-sm font-minimum text-gray-600">
                        Shift Allowance
                      </label>
                      <Field
                        name="salary.shiftAllowance"
                        type="number"
                        className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                        onWheel={(e: any) => e.currentTarget.blur()}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  )}
                  {values.salary.bonusAllowance !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Bonus Allowance
                      </label>
                      <Field
                        name="salary.bonusAllowance"
                        type="number"
                        className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                        onWheel={(e: any) => e.currentTarget.blur()}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  )}
                  {values.salary.specialAllowance !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Special Allowance
                      </label>
                      <Field
                        name="salary.specialAllowance"
                        type="number"
                        className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                        onWheel={(e: any) => e.currentTarget.blur()}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  )}
                  {values.salary.otherEarnings !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Other Earnings
                      </label>
                      <Field
                        name="salary.otherEarnings"
                        type="number"
                        className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                        onWheel={(e: any) => e.currentTarget.blur()}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Contributions */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Contributions
                  </h2>
                  {/* <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    onClick={() => {
                      setFieldValue("contributions.pf", 0);
                      setFieldValue("contributions.esi", 0);
                    }}
                  >
                    + Add Optional Fields
                  </button> */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {values.contributions.pf !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        PF Contribution
                      </label>
                      <Field
                        name="contributions.pf"
                        type="number"
                        className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                        onWheel={(e:any) => e.currentTarget?.blur()}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  )}
                  {values.contributions.esi !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        ESI Contribution
                      </label>
                      <Field
                        name="contributions.esi"
                        type="number"
                        className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                        onWheel={(e:any) => e.currentTarget.blur()}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* attendance */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Attendance
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {values.attendance.actualDays !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Actual Working Days
                      </label>
                      <Field
                        name="attendance.actualDays"
                        type="number"
                        className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                        onWheel={(e:any) => e.currentTarget.blur()}
                        onKeyDown={handleKeyDown}
                      />
                      {errors.attendance?.actualDays &&
                        touched.attendance?.actualDays && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.attendance.actualDays}
                          </div>
                        )}
                    </div>
                  )}
                  {values.attendance.totalWorkingDays !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Total Working Days
                      </label>
                      <Field
                        name="attendance.totalWorkingDays"
                        type="number"
                        className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                        onWheel={(e:any) => e.currentTarget.blur()}
                        onKeyDown={handleKeyDown}
                      />
                      {errors.attendance?.totalWorkingDays &&
                        touched.attendance?.totalWorkingDays && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.attendance.totalWorkingDays}
                          </div>
                        )}
                    </div>
                  )}
                  {values.attendance.lossOfPay !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Loss of Pay Days
                      </label>
                      <Field
                        name="attendance.lossOfPay"
                        type="number"
                        className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                        onWheel={(e:any) => e.currentTarget.blur()}
                        onKeyDown={handleKeyDown}
                      />
                      {errors.attendance?.lossOfPay &&
                        touched.attendance?.lossOfPay && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.attendance.lossOfPay}
                          </div>
                        )}
                    </div>
                  )}
                  {values.attendance.daysPayable !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Days Payable
                      </label>
                      <Field
                        name="attendance.daysPayable"
                        type="number"
                        className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                        onWheel={(e:any) => e.currentTarget.blur()}
                        onKeyDown={handleKeyDown}
                      />
                      {errors.attendance?.daysPayable &&
                        touched.attendance?.daysPayable && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.attendance.daysPayable}
                          </div>
                        )}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Generate Payslip
              </button>
              {/* </Form> */}
              {pdfUrl && (
                <div className="mt-6 text-center">
                  <a
                    href={pdfUrl}
                    download="payslip.pdf"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Download Payslip PDF
                  </a>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PayslipForm;
