import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import AuthContext from "../../contexts/AuthContext";

import useForm from "../../hooks/useForm";

import { AuthValidationConstants } from "../../utils/validationConstants";

const RegisterFormKeys = {
    username: 'username',
    email: 'email',
    password: 'password',
    confirmPassword: 'confirmPassword',
}

export default function Register() {
    const { registerSubmitHandler } = useContext(AuthContext);

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const validateValues = (values) => {
        let errors = {};
        if (values[RegisterFormKeys.username].length < AuthValidationConstants.UsernameMinLength ||
            values[RegisterFormKeys.username].length > AuthValidationConstants.UsernameMaxLength) {
            errors[RegisterFormKeys.username] = `The username must be between ${AuthValidationConstants.UsernameMinLength} and ${AuthValidationConstants.UsernameMaxLength} characters.`;
        }
        if (!AuthValidationConstants.EmailRegex.test(values[RegisterFormKeys.email])) {
            errors[RegisterFormKeys.email] = "The email is not valid.";
        }
        if (values[RegisterFormKeys.password].length < AuthValidationConstants.PasswordMinLength ||
            values[RegisterFormKeys.password].length > AuthValidationConstants.PasswordMaxLength) {
            errors[RegisterFormKeys.password] = `The password must be between ${AuthValidationConstants.PasswordMinLength} and ${AuthValidationConstants.PasswordMaxLength} characters.`;
        }
        if (values[RegisterFormKeys.password] !== values[RegisterFormKeys.confirmPassword]) {
            errors[RegisterFormKeys.confirmPassword] = `Password doesn't match.`;
        }
        return errors;
    };

    const validateAndSubmit = (values) => {
        setErrors(validateValues(values))
        setSubmitting(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            registerSubmitHandler(values);
        }
    }, [errors]);

    const { values, onChange, onSubmit } = useForm(validateAndSubmit, {
        [RegisterFormKeys.email]: '',
        [RegisterFormKeys.username]: '',
        [RegisterFormKeys.password]: '',
        [RegisterFormKeys.confirmPassword]: ''
    });

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Register your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={onSubmit} className="space-y-6">

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name={RegisterFormKeys.username}
                                type="text"
                                required
                                onChange={onChange}
                                value={values[RegisterFormKeys.username]}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                                           ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                                           focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <span className="error text-red-500 text-xs mt-1">{errors[RegisterFormKeys.username]}</span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="emailAddress" className="block text-sm font-medium leading-6 text-gray-900">
                            Email Address
                        </label>
                        <div className="mt-2">
                            <input
                                id="emailAddress"
                                name={RegisterFormKeys.email}
                                type="email"
                                required
                                onChange={onChange}
                                value={values[RegisterFormKeys.email]}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                                           ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                                           focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <span className="error text-red-500 text-xs mt-1">{errors[RegisterFormKeys.email]}</span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name={RegisterFormKeys.password}
                                type="password"
                                required
                                onChange={onChange}
                                value={values[RegisterFormKeys.password]}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                                           ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                                           focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <span className="error text-red-500 text-xs mt-1">{errors[RegisterFormKeys.password]}</span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                            Confirm Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="confirmPassword"
                                name={RegisterFormKeys.confirmPassword}
                                type="password"
                                required
                                onChange={onChange}
                                value={values[RegisterFormKeys.confirmPassword]}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                                           ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                                           focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <span className="error text-red-500 text-xs mt-1">{errors[RegisterFormKeys.confirmPassword]}</span>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 
                                       text-sm font-semibold leading-6 text-white shadow-sm 
                                       hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                                       focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already a member?{' '}
                    <Link to="/Login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}
