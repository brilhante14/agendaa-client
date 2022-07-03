import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "./Calendar.module.css";
import Day from "./Day";

interface Props {
  year: number;
  month:
    | "01"
    | "02"
    | "03"
    | "04"
    | "05"
    | "06"
    | "07"
    | "08"
    | "09"
    | "10"
    | "11"
    | "12";
  navigate: (d: Date) => void;
}

function daysInMonth(month: string): number {
  if (["01", "03", "05", "07", "08", "10", "12"].includes(month)) return 31;
  else if (["04", "06", "09", "11"].includes(month)) return 30;
  else return 28;
}

const Calendar: React.FC<Props> = ({ year, month, navigate }) => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const weekdaysClasses = [1, 5];

  function select(d: Date) {
    if (weekdaysClasses.includes(d.getUTCDay())) {
      setSelectedDay(d);
      navigate(d);
    }
  }

  const firstDayOfMonth = new Date(year, parseInt(month), 1, 12);
  const allDaysInMonth: Array<Date> = [];
  for (let i = 1; i <= daysInMonth(month); i++) {
    allDaysInMonth.push(new Date(year, parseInt(month), i, 12));
  }
  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        {firstDayOfMonth.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </div>
      <div className={styles.calendarGrid}>
        {["D", "S", "T", "Q", "Q", "S", "S"].map((d, idx) => (
          <div className={styles.weekDay} key={idx}>
            {d}
          </div>
        ))}
        {allDaysInMonth.map((day) => {
          const dayOfMonth = day.getUTCDate();
          const dayOfWeek = day.getUTCDay();

          return (
            <Day
              day={dayOfMonth}
              // TODO: Replace by real weekdays
              hasClass={weekdaysClasses.includes(dayOfWeek)}
              isSelected={day.getTime() === selectedDay.getTime()}
              onClick={() => select(day)}
              column={dayOfWeek}
              key={day.toDateString()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
