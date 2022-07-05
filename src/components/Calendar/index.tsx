import React, { useState } from "react";
import styles from "./Calendar.module.css";
import Day from "./Day";
import navigate_next from "../../assets/svg/navigate_next.svg";
import navigate_before from "../../assets/svg/navigate_before.svg";
import IconButton from "../IconButton";

interface Props {
  initialYear: number;
  initialMonth: number;
  navigate: (d: Date) => void;
  weekdays: Array<number>;
}

function daysInMonth(month: number): number {
  if ([0, 2, 4, 6, 7, 9, 11].includes(month)) return 31;
  else if ([3, 5, 8, 10].includes(month)) return 30;
  else return 28;
}

const Calendar: React.FC<Props> = ({
  initialYear,
  initialMonth,
  navigate,
  weekdays,
}) => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState<number>(initialMonth);
  const [currentYear, setCurrentYear] = useState<number>(initialYear);
  // const weekdaysClasses = [1, 5];

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }

  function previousMonth() {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }

  function select(d: Date) {
    if (weekdays && weekdays.includes(d.getUTCDay())) {
      setSelectedDay(d);
      navigate(d);
    }
  }

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const allDaysInMonth: Array<Date> = [];
  for (let i = 1; i <= daysInMonth(currentMonth); i++) {
    allDaysInMonth.push(new Date(currentYear, currentMonth, i));
  }
  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <IconButton
          title="Mês Anterior"
          icon={navigate_before}
          onClick={previousMonth}
          showTitle={false}
          variant="primary"
        />
        {firstDayOfMonth.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
        <IconButton
          title="Próximo Mês"
          icon={navigate_next}
          onClick={nextMonth}
          showTitle={false}
          variant="primary"
        />
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
              hasClass={weekdays && weekdays.includes(dayOfWeek)}
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
