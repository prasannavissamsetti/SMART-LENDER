/**
 * Validation logic for Smart Lender input form fields.
 */
export const validateLoanForm = (formData) => {
  const errors = {};
  
  // Applicant Income check
  const applicantIncome = parseFloat(formData['Applicant Income']);
  if (formData['Applicant Income'] === '' || isNaN(applicantIncome)) {
    errors['Applicant Income'] = 'Applicant Income is required';
  } else if (applicantIncome <= 0) {
    errors['Applicant Income'] = 'Applicant Income must be greater than 0';
  }

  // Coapplicant Income check
  const coapplicantIncome = parseFloat(formData['Coapplicant Income']);
  if (formData['Coapplicant Income'] === '' || isNaN(coapplicantIncome)) {
    errors['Coapplicant Income'] = 'Coapplicant Income is required';
  } else if (coapplicantIncome < 0) {
    errors['Coapplicant Income'] = 'Coapplicant Income cannot be negative';
  }

  // Loan Amount check
  const loanAmount = parseFloat(formData['Loan Amount']);
  if (formData['Loan Amount'] === '' || isNaN(loanAmount)) {
    errors['Loan Amount'] = 'Loan Amount is required';
  } else if (loanAmount <= 0) {
    errors['Loan Amount'] = 'Loan Amount must be greater than 0';
  }

  // Loan Amount Term check
  const loanAmountTerm = parseFloat(formData['Loan Amount Term']);
  if (formData['Loan Amount Term'] === '' || isNaN(loanAmountTerm)) {
    errors['Loan Amount Term'] = 'Loan Term is required';
  } else if (loanAmountTerm <= 0) {
    errors['Loan Amount Term'] = 'Loan Term must be greater than 0';
  }

  // Categorical checks
  const requiredCategories = [
    'Gender',
    'Marital Status',
    'Dependents',
    'Education',
    'Employment Status',
    'Credit History',
    'Property Area'
  ];

  requiredCategories.forEach(field => {
    const val = formData[field];
    if (val === undefined || val === null || val === '') {
      errors[field] = `${field} selection is required`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
