import dayjs from 'dayjs'
import 'dayjs/locale/uk'

export const getCurrentDay = (day) => {
    return dayjs(day).format('MMM,DD')
}

export const changeDateLocale = (val) => {
    val ? dayjs.locale('uk') : dayjs.locale('en')
}