import React from 'react'
import { ResponsiveCalendar } from '@nivo/calendar'
import { data } from './data'
import dayjs from 'dayjs'

function ProfileCalendar(props) {
  const now = dayjs()
  console.log(data)
  return (
    <ResponsiveCalendar
      data={data}
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
