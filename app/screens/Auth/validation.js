import * as Yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const phoneRegExpNew = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/

export const signUpSchema = Yup.object({
	email: Yup.string()
		.email('Invalid email!')
		.required('* Required'),
	firstName: Yup.string()
		.min(3, 'Too Short!')
		.max(30, 'Too Long!')
		.required('* Required'),
	lastName: Yup.string()
		.min(3, 'Too Short!')
		.max(30, 'Too Long!')
		.required('* Required'),
	username: Yup.string()
		.min(4, 'Too short')
		.max(20, "Too Long")
		.required("* Required"),
	tel: Yup.string()
		.matches(phoneRegExpNew, 'Phone number is not valid')
		.required("* Required"),
	password1: Yup.string()
		.min(8, 'Password is too short - should be 8 chars minimum.')
		.required('No password provided.'),
	password2: Yup.string()
		.oneOf([Yup.ref('password1'), null], 'Passwords must match')
});

export const signInSchema = Yup.object({
	email: Yup.string()
		.email()
		.required("No email entered"),
	password: Yup.string()
		.required("No password entered")
});
