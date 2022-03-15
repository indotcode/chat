export function dateInfo(date: any){
    const dates = new Date(date)
    return dates.getDate() + '.' + (dates.getUTCMonth() < 10 ? '0' + dates.getUTCMonth(): dates.getUTCMonth()) + '.' + dates.getFullYear() + ' ' + dates.toLocaleTimeString()
}