import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addDays, subDays, isSameDay, getDay } from 'date-fns';

interface DateObject {
    date: string,
    isCurrentMonth?: boolean,
    isToday?: boolean,
    isSelected?: boolean
}

const useCalendar = () => {
    const [today, setToday] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(today);
    const [currentScope, setCurrentScope] = useState<DateObject[]>([]);

    useEffect(() => {
        generateDates();
    }, [currentMonth, selectedDate]);

    const generateDates = () => {
        const start = startOfMonth(currentMonth);
        const end = endOfMonth(currentMonth);

        const startDayOfWeek = (getDay(start) + 6) % 7; // Shift Sunday to index 6 (end of the week)
        const endDayOfWeek = (6 - ((getDay(end) + 6) % 7)); // Calculate the padding after end of the month.

        const daysBeforeStart = subDays(start, startDayOfWeek);
        const daysAfterEnd = addDays(end, endDayOfWeek);
        const interval = { start: daysBeforeStart, end: daysAfterEnd };

        const dates = eachDayOfInterval(interval).map((date: Date) => {
            const formattedDate = format(date, 'yyyy-MM-dd');
            const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
            const isToday = isSameDay(date, today);
            const isSelected = isSameDay(date, selectedDate);

            return {
                date: formattedDate,
                ...(isCurrentMonth && { isCurrentMonth }),
                ...(isToday && { isToday }),
                ...(isSelected && { isSelected }),
            };
        });

        setCurrentScope(dates);
    }

    const selectDate = (date: Date) => {
        setSelectedDate(date);
    }

    const navigateMonth = (offset: number) => {
        setCurrentMonth((prevMonth: Date) => {
            const newMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + offset, 1);
            return newMonth;
        });
    };

    return { today, currentScope, selectedDate, currentMonth, selectDate, navigateMonth };
}

export default useCalendar;
