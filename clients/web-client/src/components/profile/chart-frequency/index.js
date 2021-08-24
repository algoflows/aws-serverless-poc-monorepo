import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { ResponsiveCalendar } from '@nivo/calendar'
import dayjs from 'dayjs'
import Loader from '../../loaders'

function ProfileCalendar({ userId }) {
  const now = dayjs()

  const fetchEntries = async () => {
    return await (
      await fetch(`https://dev-api.opsap.com/logbook/diving/diver/get-entries/${encodeURI(userId)}`)
    ).json()
  }

  const { isLoading, isError, data, error } = useQuery('get-entries', fetchEntries)

  if (isLoading) return <Loader />
  if (isError) return <div>{error.message}</div>

  // Select required field props for chartComponent
  const selectedFields = data.Items.map((item) => {
    const entry = {
      value: item['bottomTime'],
      day: dayjs(item['leftSurface']).format('YYYY-MM-DD')
    }

    return entry
  })

  return (
    <ResponsiveCalendar
      data={selectedFields}
      from={now.subtract(1, 'year')}
      to={now}
      emptyColor="#eeeeee"
      colors={['darkblue', 'lightblue', 'lightyellow', 'orange']}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      yearSpacing={40}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'row',
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: 'right-to-left'
        }
      ]}
    />
  )
}

export default ProfileCalendar
