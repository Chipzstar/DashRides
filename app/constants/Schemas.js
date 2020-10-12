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
	riderKey: "",
	driverKey: "",
	sourceAddress: "",
	sourcePlaceName: "",
	destAddress: "",
	destPlaceName: "",
	pickupCoordinate: [0.0,0.0],
	destinationCoordinate: [0.0,0.0],
	canCancelTrip: true,
	driverFare: Number(0.00),
	tripFare: Number(0.00),
	applicationFee: Number(0.00),
	userHasPayed: false,
	tripAccepted: true,
}

export const requestSchema = {
	tripAccepted: false,
	riderKey: "",
	driverKey: "",
	pickupCoordinate: [],
	destinationCoordinate: [],
	sourceAddress: "",
	sourcePlaceName: "",
	destAddress: "",
	destPlaceName: "",
	driverType: {
		gender: "",
		experience: "",
	},
	environmentFee: "",
	price: "",
	arrivalTime: "",
	passengers: 0,
}

export const pickupSchema = {
	driverKey: "",
	driverName: "",
	reg: "",
	car: "",
	carColour: "",
	arrivalTime: "",
}
