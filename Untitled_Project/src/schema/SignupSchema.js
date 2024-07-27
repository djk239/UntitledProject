import * as yup from 'yup';

const passwordRules = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/; 
// min 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character


// Schema for signup form. All fields are required. Passwords must match. Password must meet requirements set above.

export const signupSchema = yup.object().shape({        
    username: yup.string().required(),  
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(passwordRules, {"message": "Must have : Number, Uppercase, Lowercase, Special Character"})
    .required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
});  