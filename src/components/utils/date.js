import moment from 'moment'

function startWeekFromMonday() {
  moment.updateLocale('en', { week: { dow: 1 } })
}

startWeekFromMonday()

export const monthNamesArr = moment()._locale._months

export function isSelectedDay(dayObj, selectedDay) {
  return dayObj.id === selectedDay
}

export function getDayOfWeek(momentDay) {
  const weekdaysMin = moment()._locale._weekdaysMin
  return weekdaysMin[momentDay.day()]
}

export function getTodayDayId() {
  return moment().format('DDMMYYYY')
}

export function getCurrentYear() {
  return moment().year()
}

export function getCurrentMonth() {
  return moment().month()
}

export function getDayOfMonth(momentDay) {
  return momentDay.date()
}

export function getMonthOfYear(momentDay) {
  return momentDay.month() + 1
}

export function getYear(momentDay) {
  return momentDay.year()
}

export function isCurrentMonth(momentDay, selectMonth) {
  return momentDay.month() === selectMonth
}

export function getId(momentDay) {
  return momentDay.format('DDMMYYYY')
}

export function isToday(momentDay) {
  return momentDay.isSame(moment(), 'day')
}

export function isSameDate(oneDate, secondDate, granularity = 'day') {
  return oneDate.isSame(secondDate, granularity)
}

export function setCurrentMomentDate(year, month, day = 1) {
  return moment().set({ year: year, month: month, date: day })
}

export function isValidDate(dateString) {
  return moment(dateString).isValid()
}

export function getCurrentDate() {
  return moment().format('YYYY.MM.DD')
}

export function getCurrentTime(momentDay) {
  return momentDay.format('HH:mm')
}

export function getFullTime(momentDay) {
  return momentDay.format('YYYY.MM.DD HH:mm')
}
