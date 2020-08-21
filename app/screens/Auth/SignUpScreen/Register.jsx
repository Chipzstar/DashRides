import React, { Component } from "react";
import AuthContext from "../../../navigation/context";
import { Keyboard, SafeAreaView, ScrollView, TouchableWithoutFeedback } from "react-native";
import UserPermissions from "../../../permissions/UserPermissions";
import * as ImagePicker from "expo-image-picker";
import SignUpSlide from "../../../components/SignUpSlide";
import { width } from "../styles";
import { getErrors, validateSignUp } from "../validation";

const slides = [
	{
		key: "firstName",
		pageNum: 0,
		label: "FIRST NAME",
		title: "Hey, let's start with your first name",
		value: ""
	},
	{
		key: "lastName",
		pageNum: 1,
		label: "LAST NAME",
		title: "What's your last name?",
		value: ""
	},
	{
		key: "email",
		pageNum: 2,
		label: "EMAIL",
		title: "What's your email address?",
		value: ""
	},
	{
		key: "tel",
		pageNum: 3,
		label: "PHONE",
		title: "And your phone number?",
		value: ""
	},
	{
		key: "password",
		pageNum: 4,
		label: "PASSWORD",
		title: "Ok, now let's pick a password.",
		value: ""
	},
	{
		key: "username",
		pageNum: 5,
		label: "USERNAME",
		title: "Almost there, just pick a username.",
		value: ""
	}
];

export default class Register extends Component {
	static contextType = AuthContext;
	profileBtn = null;

	constructor(props) {
		super(props);
		this.state = {
			avatar: null,
			inputs: {
				email: "",
				username: "",
				firstName: "",
				lastName: "",
				tel: "",
				avatar: null,
				password: "",
				confirmPassword: ""
			},
			errors: {}
		};
	}

	componentDidMount() {
		console.log(this.props.navigation.dangerouslyGetState());
	}

	navigateBack = () => {
		this.props.navigation.pop();
	};

	handlePickAvatar = async () => {
		this.setState({ isModalVisible: false });
		await UserPermissions.getCameraPermission();
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3]
		});
		!result.cancelled ? this.setState({ avatar: result.uri }) : null;
		return result;
	};

	handleChange = (inputType, value) => {
		const { inputs } = this.state;
		inputs[inputType] = value.trimEnd();
		this.setState({ inputs: inputs });
	};

	handleSubmit = async () => {
		const { signUp } = this.context;
		const { inputs } = this.state;
		let isValid = await validateSignUp(inputs);
		console.log("Form valid:", isValid);
		if (isValid) {
			await signUp(inputs);
			Object.keys(inputs).forEach((key) => inputs[key] = "");
			console.log(inputs)
			this.setState({ inputs: inputs }, () => console.log(this.state));
		} else {
			let yupErrors = await getErrors(inputs);
			this.setState({ errors: yupErrors }, () => {
				console.log(this.state.errors);
				let errorPageNum = this.getErrorPageNum(Object.keys(yupErrors)[0]);
				this.scroll.scrollTo({ x: errorPageNum * width, y: 0, animated: true });
			});
		}
	};

	getErrorPageNum = (key) => {
		let page = slides.find(item => item.key === key);
		if (page) return page.pageNum;
		else return 4;
	};

	scrollNext = (page) => {
		this.scroll.scrollTo({ x: (page + 1) * width, y: 0, animated: true });
	};

	scrollBack = (page) => {
		this.scroll.scrollTo({ x: (page - 1) * width, y: 0, animated: true });
	};

	render() {
		const { navigation } = this.props;
		const _renderSlides = () => {
			return slides.map(item => {
				return item.pageNum === 0 && navigation.dangerouslyGetState().index === 0 ?
					<SignUpSlide
						errors={this.state.errors}
						key={item.key}
						item={item}
						isPassword={item.key === "password"}
						onChangeHandler={this.handleChange}
						onSubmit={this.handleSubmit}
						onNext={this.scrollNext.bind(this, item.pageNum)}
					/> :
					<SignUpSlide
						errors={this.state.errors}
						key={item.key}
						item={item}
						isPassword={item.key === "password"}
						onChangeHandler={this.handleChange}
						onSubmit={this.handleSubmit}
						onNext={this.scrollNext.bind(this, item.pageNum)}
						onBack={item.pageNum === 0 ? this.navigateBack : this.scrollBack.bind(this, item.pageNum)}
					/>;
			});
		};
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<SafeAreaView style={{ flex: 1 }}>
					<ScrollView
						style={{ flex: 1 }}
						horizontal={true}
						pagingEnabled={true}
						ref={(node) => this.scroll = node}
					>
						{_renderSlides()}
					</ScrollView>
				</SafeAreaView>
			</TouchableWithoutFeedback>
		);
	}
}
