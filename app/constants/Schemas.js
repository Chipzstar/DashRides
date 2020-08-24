export const usersSchema = {
	isActive: "",
	customerAccID: "",
	firstname:"",
	surname: "",
	profilePicURL: "",
	provider: "",
	tel: "",
	coordinate: {
		0: "",
		1: ""
	}
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