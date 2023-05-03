import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const format = new Intl.DateTimeFormat('ru-ru', {month: 'short'}).format
const shortMonths = [...Array(12).keys()].map((m) => format(new Date().setMonth(m)));

export const getMonthNumber = (format: dayjs.OptionType) => (value: string | null | undefined): number | undefined => {
  if (!value) {
    return
  }

  return dayjs(value, format).month()
}

export const getMonthShort = (format: dayjs.OptionType) => (value: string | null | undefined): string => {
  if (!value) {
    return ''
  }

  const monthNumber = dayjs(value, format).month()

  return shortMonths.at(monthNumber) ?? ''
}

export const getMonthShortByNumber = (value: string | number | undefined): string => {
  if (!value) {
    return ''
  }

  const monthNum = parseInt(value.toString(), 10)

  return shortMonths.at(monthNum) ?? ''
}
