import React, { Component } from "react";
import { Block, Button, Input, Text } from "galio-framework";
import Theme from "../../../constants/Theme";
import AuthContext from "../../../navigation/context";
import { Formik } from "formik";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { signUpSchema } from "../validation";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";
import UserPermissions from "../../../permissions/UserPermissions";
import * as ImagePicker from "expo-image-picker";
import showPopupMenu from "react-native-popup-menu-android";

export default class Register extends Component {
	static contextType = AuthContext;
	profileBtn = null;

	constructor(props) {
		super(props);
		this.state = {
			avatar: null,
			errors: {}
		};
	}

	handlePickAvatar = async () => {
		this.setState({isModalVisible: false})
		await UserPermissions.getCameraPermission();
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3]
		});
		!result.cancelled ? this.setState({ avatar: result.uri }) : null;
		return result;
	};

	showOptions = () => {
		showPopupMenu(
			[
				{ id:1, label:'Change' },
				{ id:2, label:'Remove' }
			],
			this.handleMoreItemSelect,
			this.profileBtn
		);
	}

	handleMoreItemSelect = (item) => {
		switch (item.id){
			case 1:
				this.handlePickAvatar().then(res => console.log(res))
				return;
			case 2:
				this.setState({avatar: null})
		}
	}

	refOptions = el => this.profileBtn = el

	render() {
		const { signUp } = this.context;
		return (
			<Block flex style={styles.container}>
				<Block>
					<Text h1 style={styles.signUpHeader}>Sign Up</Text>
				</Block>
				<TouchableOpacity
					style={styles.profileImagePicker}
					onPress={this.handlePickAvatar}
					onLongPress={this.showOptions}
					ref={this.refOptions}
				>
					<Image source={{ uri: this.state.avatar }} style={styles.avatar}/>
					<Ionicons
						name="md-add"
						size={40}
						color={Theme.COLOURS.WHITE}
						style={this.state.avatar && { display: "none" }}
					/>
				</TouchableOpacity>
				<Formik
					initialValues={{
						email: "",
						username: "",
						firstName: "",
						lastName: "",
						tel: "",
						password1: "",
						password2: "",
						avatar: null
					}}
					onSubmit={(values, actions) => {
						values = { ...values, avatar: this.state.avatar };
						console.log("Inputs", values);
						actions.resetForm();
						signUp(values);
					}}
					validationSchema={signUpSchema}
				>
					{(props) => (
						<ScrollView showsVerticalScrollIndicator={false}>
							<Input
								autoCompleteType={"email"}
								placeholder={"Email"}
								value={props.values.email}
								onChangeText={props.handleChange("email")}
								style={styles.input}
								onBlur={props.handleBlur("email")}
							/>
							<Text style={styles.error} muted>{props.touched.email && props.errors.email}</Text>
							<Input
								autoCompleteType={"username"}
								value={props.values.username}
								onChangeText={props.handleChange("username")}
								placeholder={"Username"}
								style={styles.input}
								onBlur={props.handleBlur("username")}
							/>
							<Text style={styles.error} muted>{props.touched.username && props.errors.username}</Text>
							<Input
								autoCompleteType={"name"}
								value={props.values.firstName}
								onChangeText={props.handleChange("firstName")}
								placeholder={"First Name"}
								style={styles.input}
								onBlur={props.handleBlur("firstName")}
							/>
							<Text style={styles.error} muted>{props.touched.firstName && props.errors.firstName}</Text>
							<Input
								placeholder={"Last Name"}
								value={props.values.lastName}
								onChangeText={props.handleChange("lastName")}
								style={styles.input}
								onBlur={props.handleBlur("lastName")}
							/>
							<Text muted style={styles.error}>{props.touched.lastName && props.errors.lastName}</Text>
							<Input
								autoCompleteType={"password"}
								placeholder="password"
								style={styles.input}
								value={props.values.password1}
								onChangeText={props.handleChange("password1")}
								onBlur={props.handleBlur("password1")}
								password
								viewPass
							/>
							<Text style={styles.error} muted>{props.touched.password1 && props.errors.password1}</Text>
							<Input
								placeholder="Confirm Password"
								style={styles.input}
								value={props.values.password2}
								onChangeText={props.handleChange("password2")}
								onBlur={props.handleBlur("password2")}
								password
							/>
							<Text style={styles.error} muted>{props.touched.password2 && props.errors.password2}</Text>
							<Input
								autoCompleteType={"tel"}
								placeholder={"Mobile number"}
								maxLength={15}
								style={styles.input}
								value={props.values.tel}
								onChangeText={props.handleChange("tel")}
								onBlur={props.handleBlur("tel")}
							/>
							<Text muted style={styles.error}>{props.touched.tel && props.errors.tel}</Text>
							<Block center>
								<Button
									style={styles.button}
									color={Theme.COLOURS.SECONDARY}
									textStyle={{ color: Theme.COLOURS.BLACK }}
									onPress={props.handleSubmit}
								>
									<Text style={styles.btnText}>Register</Text>
								</Button>
							</Block>
						</ScrollView>
					)}
				</Formik>
			</Block>
		);
	}
}

