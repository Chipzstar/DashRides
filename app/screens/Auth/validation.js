import * as Yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const phoneRegExpNew = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;

export const signUpSchema = Yup.object({
	email: Yup.string()
		.email("Invalid email!")
		.required("* Required"),
	firstName: Yup.string()
		.min(3, "Too Short!")
		.max(30, "Too Long!")
		.required("* Required"),
	lastName: Yup.string()
		.min(3, "Too Short!")
		.max(30, "Too Long!")
		.required("* Required"),
	username: Yup.string()
		.min(4, "Too short")
		.max(20, "Too Long")
		.required("* Required"),
	tel: Yup.string()
		.matches(phoneRegExpNew, "Phone number is not valid")
		.required("* Required"),
	password: Yup.string()
		.min(8, "Password is too short - should be 8 chars minimum.")
		.required("No password provided."),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password"), null], "Passwords must match")
});

export const signInSchema = Yup.object({
	email: Yup.string()
		.email("Invalid email!")
		.required("No email entered"),
	password: Yup.string()
		.required("No password entered")
});

export const getErrors = (inputs) => signUpSchema
	.validate(inputs, {abortEarly: true})
	.then(res => console.log("No errors", res))
	.catch(err => {
		let obj = {};
		obj[err.path] = err.errors[0];
		return obj
	})
// check validity
export const validateSignUp = async (inputs) => signUpSchema
	.isValid(inputs)
	.then((valid) => valid);

export const yupCast = signUpSchema.cast({
	email: 'jimmy@googlemail.com',
	password: 'hello',
});
