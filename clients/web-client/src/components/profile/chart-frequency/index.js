import React, { useEffect } from 'react'
import { ResponsiveCalendar } from '@nivo/calendar'
import { useFetchLogFreqData } from '../../../hooks/useFetchLogFreqData'
import Loader from '../../loaders'
import dayjs from 'dayjs'

const now = dayjs()

function LogFrequencyChart({ userId }) {
  const { fetchState } = useFetchLogFreqData(userId)

  if (fetchState.matches('pending')) return <Loader size={100} loading={true} />
  if (fetchState.matches('failed')) return <span>Error: {fetchState.context.message}</span>

  const data = fetchState.event.result?.Items || []

  // Select required fields for chartComponent props
  const preparedData = data.map((item) => {
    const entry = {
      value: item['bottomTime'],
      day: dayjs(item['leftSurface']).format('YYYY-MM-DD')
    }
    return entry
  })

  return (
    <ResponsiveCalendar
      data={preparedData}
      from={now.subtract(1, 'year')}
      to={now}
      emptyColor="#eeeeee"
      colors={['#5ba4cf', '#0079bf', '#055a8c', '#0c3953']}
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

export default LogFrequencyChart
