def clean_input_data(data):
    """
    Clean and validate raw request data before passing it to the prediction service.
    Ensures all keys are present and handles parsing/defaulting of types.
    """
    cleaned = {}
    
    # Required keys and their default values
    fields_mapping = {
        'Gender': 'Male',
        'Marital Status': 'No',
        'Dependents': '0',
        'Education': 'Graduate',
        'Employment Status': 'No',
        'Applicant Income': 0.0,
        'Coapplicant Income': 0.0,
        'Loan Amount': 0.0,
        'Loan Amount Term': 360.0,
        'Credit History': 1.0,
        'Property Area': 'Semiurban'
    }
    
    for key, default in fields_mapping.items():
        val = data.get(key, default)
        
        # Strip string values
        if isinstance(val, str):
            val = val.strip()
            
        # Parse numeric types
        if isinstance(default, float):
            try:
                # Remove currency symbols or commas if present
                if isinstance(val, str):
                    val = val.replace('$', '').replace(',', '')
                val = float(val)
            except (ValueError, TypeError):
                val = default
                
        cleaned[key] = val
        
    return cleaned
