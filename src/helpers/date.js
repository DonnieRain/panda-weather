import dayjs from 'dayjs'

export const getCurrentDay = (day) => {
    return dayjs(day).format('MMM,DD')
}

export const getDayWeek = (week) => {
    const date = dayjs()
    if (week) {
        return date.add(7, 'day').format()
    }
    return dayjs().format()
}