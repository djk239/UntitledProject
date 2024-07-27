import * as yup from 'yup';

// Schema for login form. Both a username and password must be provided.

export const loginSchema = yup.object().shape({        
    username: yup.string().required("Username is required"),  
    password: yup
    .string()
    .required("Password is required"),
});  