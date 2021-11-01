import { Button, Typography, Paper } from '@mui/material'
import React, { useState, useEffect } from 'react'
import DateTime from '../components/DateTime'
import CubicleTable from '../components/CubicleTable'
import { Link } from 'react-router-dom'
import { Stack } from '@mui/material'
import moment from 'moment'
import { useReservation } from '../context/ReservationContext'
import { useAuth } from '../context/AuthContext'

const Cubicles = () => {
	const [value, setValue] = useState([null, null])

	const [filteredData, setFilteredData] = useState([])
	const { reservation } = useReservation()
	const { user } = useAuth()

	const filteredReservation = reservation.filter(
		(o) => o.userID == user.toString()
	)
	useEffect(() => {
		//declaration (sets secondFilteredData to dates that are reserved)
		const filteredData = []
		const secondFilteredData = reservation.filter(
			(current) =>
				moment(current.startTime).isSameOrAfter(value[0]) &&
				moment(current.endTime).isSameOrBefore(value[1])
		)

		//Checks for if Cubicle id is equal to i for each date range in secondFilteredData
		//If cubicle is included in secondFilteredData then don't allow user to reserve it by not putting it into filteredData
		for (let i = 1; i <= 5; i++)
		{
			let bool = new Boolean(false)
			secondFilteredData.forEach((current) => {
				if (current.cubicleID.localeCompare(i.toString()) == 0)
				{
					bool = new Boolean(true)
				}
			})

			if (bool == false)
			{
				filteredData.push(
					{
						userID: user.toString(),
						cubicleID: i.toString(),
						startTime: new Date(value[0]),
						endTime: new Date(value[1]),
					})
			}
		}

		setFilteredData(filteredData)
	}, [value])

	return (
		<Stack spacing={2}>
			<Paper elevation={2} sx={{ p: 2 }}>
				<Typography variant='h5' gutterBottom>
					Reserve A Cubicle
				</Typography>
				<Stack spacing={2}>
					<DateTime value={value} setValue={setValue} />

					{value[0] !== null && value[1] !== null && (
						<CubicleTable cubicles={filteredData} showReserve />
					)}
				</Stack>
			</Paper>

			{reservation && reservation.length > 0 && (
				<Paper elevation={2} sx={{ p: 2 }}>
					<Typography variant='h5' gutterBottom>
						My reservations
					</Typography>
					<CubicleTable cubicles={filteredReservation} showDelete />
				</Paper>
			)}
		</Stack>
	)
}

export default Cubicles
