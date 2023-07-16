import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addDays, subDays, isSameDay, getDay } from 'date-fns';

/**
 * @interface DateObject
 * An interface to represent a date object, used for the dates in the current view scope of the calendar.
 */
interface DateObject {
    date: string, // Date in 'yyyy-MM-dd' format
    isCurrentMonth?: boolean, // Flag to indicate if the date is in the current month
    isToday?: boolean, // Flag to indicate if the date is the current day
    isSelected?: boolean // Flag to indicate if the date is the selected date
}

/**
 * useCalendar is a custom React hook that provides functionality for managing a calendar view.
 * It generates an array of DateObjects to represent the dates in the current month,
 * including padding dates from the previous and next month.
 * It also provides functionality for selecting a date and navigating through months.
 */
const useCalendar = () => {
    const [today, setToday] = useState(new Date()); // The current date
    const [currentMonth, setCurrentMonth] = useState(new Date()); // The current month being displayed
    const [selectedDate, setSelectedDate] = useState(today); // The currently selected date
    const [currentScope, setCurrentScope] = useState<DateObject[]>([]); // The current scope of dates to display in the calendar view

    useEffect(() => {
        generateDates(); // Generate the dates whenever the current month or selected date changes
    }, [currentMonth, selectedDate]);

    /**
     * Generates the dates for the calendar view, including padding dates from the previous and next month.
     */
    const generateDates = () => {
        const start = startOfMonth(currentMonth);
        const end = endOfMonth(currentMonth);

        // Adjusts the week start to Monday
        const startDayOfWeek = (getDay(start) + 6) % 7;
        const endDayOfWeek = (6 - ((getDay(end) + 6) % 7));

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

    /**
     * Sets the selected date.
     * @param {Date} date - The date to be selected.
     */
    const selectDate = (date: Date) => {
        setSelectedDate(date);
    }

    /**
     * Changes the current month by a given offset.
     * @param {number} offset - The number of months to add to the current month. Can be negative to go back.
     */
    const navigateMonth = (offset: number) => {
        setCurrentMonth((prevMonth: Date) => {
            const newMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + offset, 1);
            return newMonth;
        });
    };

    // Return the current date, dates to display, selected date, current month, and functions to select a date and navigate through months
    return { today, currentScope, selectedDate, currentMonth, selectDate, navigateMonth };
}

export default useCalendar;
