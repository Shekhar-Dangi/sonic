import Calendar from "./CustomCalendar/Calendar";
import { useUserStore } from "../stores/userStore";
import { useCalendarData } from "../hooks/useCalendarData";

function RightSideBar() {
  const { logs } = useUserStore();
  const { calendarData, canGoToNextMonth, formatDateKey } =
    useCalendarData(logs);

  const handleDateClick = (date: Date) => {
    console.log("Selected date:", date);
  };

  return (
    <>
      <div className="flex-3/7">
        <Calendar
          data={calendarData}
          canGoToNextMonth={canGoToNextMonth}
          formatDateKey={formatDateKey}
          onDateClick={handleDateClick}
        />
      </div>
    </>
  );
}

export default RightSideBar;
