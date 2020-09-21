export const usersSchema = {
	isActive: "",
	customerAccID: "",
	firstname:"",
	surname: "",
	profilePicURL: "",
	provider: "Firebase",
	tel: "",
	coordinate: {
		0: "",
		1: ""
	},
	fcmToken: ""
}

export const tripSchema = {
	tripId: "",
	riderKey: "",
	driverKey: "",
	pickUpCoordinate: [0.0,0.0],
	destinationCoordinate: [0.0,0.0],
	canCancelTrip: true,
	tripAccepted: false,
	driverFare: Number(0.00),
	tripFare: Number(0.00),
	applicationFee: Number(0.00)
}

export const requestSchema = {
	isAccepted: false,
	riderKey: "",
	driverKey: "",
	source: {},
	dest: {},
	driverType: {
		gender: "",
		experience: "",
	},
	environmentFee: "",
	price: "",
	arrivalTime: "",
	passengers: 0,
}
