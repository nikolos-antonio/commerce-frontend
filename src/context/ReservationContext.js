import React, { useState } from 'react'
import moment from 'moment'

//set default values
const ReservationContext = React.createContext([
	{
		userID: '',
		cubicleID: '',
		startTime: '',
		endTime: '',
	},
])

export const ReservationContextProvider = ({ children }) => {
	const [reservation, setReservation] = useState([
		{
			userID: 'nikolos@gmail.com',
			cubicleID: '1',
			startTime: new Date(2021, 9, 27),
			endTime: new Date(2021, 9, 28),
		},
		{
			userID: 'charlie@gmail.com',
			cubicleID: '2',
			startTime: new Date(2021, 9, 28),
			endTime: new Date(2021, 9, 29),
		},
		{
			userID: 'nikolos@gmail.com',
			cubicleID: '4',
			startTime: new Date(2021, 10, 1),
			endTime: new Date(2021, 10, 4),
		},
		{
			userID: 'charlie@gmail.com',
			cubicleID: '5',
			startTime: new Date(2021, 10, 4),
			endTime: new Date(2021, 10, 6),
		},
	])

	const addReservation = (cubicle) => {

		if (reservation.find((o) => o.cubicleID === cubicle.cubicleID && o.userID === cubicle.userID))
			return 'Error'

		setReservation([...reservation, { ...cubicle }])
	}

	const removeReservation = (cubicle) => {
		const filtered = reservation.filter(
			(current) => current.cubicleID !== cubicle.cubicleID
		)

		setReservation([...filtered])
	}

	return (
		<ReservationContext.Provider
			value={{ reservation, addReservation, removeReservation }}
		>
			{children}
		</ReservationContext.Provider>
	)
}

export const useReservation = () => React.useContext(ReservationContext)
