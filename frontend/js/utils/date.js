
function getDateOfISOWeek(year, week) {
    const date = new Date(year, 0, 1 + (week - 1) * 7);
    const day = date.getDay();
    return new Date(date.setDate(date.getDate() + (day === 0 ? 1 : 8 - day)));
}
  
   
function getMondayOfWeek(year, week) {
    const date = getDateOfISOWeek(year, week);
    const day = date.getUTCDay() || 7;
    if (day !== 1) {
      date.setUTCDate(date.getUTCDate() + 1 - day);
    }
    return date;
}

function getNomberOfWeek() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const daysSinceFirstDay = Math.floor((today - firstDayOfYear) / (24 * 60 * 60 * 1000));
    const daysSinceLastThursday = daysSinceFirstDay + (4 - firstDayOfYear.getDay());
    const weekNumber = Math.floor(daysSinceLastThursday / 7) + 1;
    return weekNumber - 1;
}

function getWeekDates(mondayDate) {
    const daysOfWeek = ['Lundi', 'Mardi', 'Merc.', 'Jeudi', 'Vend.'];
    const weekDates = {};
    for (let i = 0; i < 5; i++) {
      const date = new Date(mondayDate);
      date.setDate(mondayDate.getDate() + i);
      const dayOfWeek = daysOfWeek[i];
      weekDates[dayOfWeek] = date.toISOString().slice(0, 10);
    }
    return weekDates;
}