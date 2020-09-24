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
	userHasPayed: false
}

export const requestSchema = {
	isAccepted: false,
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
