# useCalendar React Hook

`useCalendar` is a React Hook written in TypeScript that generates calendar data. This hook is a utility that helps you to create flexible and customizable calendar-based components.

## Installation

```bash
npm install use-calendar
# or with yarn
yarn add use-calendar
```

## Usage

Import `useCalendar` from the package and use it in your component:

```tsx
import useCalendar from "use-calendar";

function App() {
  const {
    today,
    currentScope,
    selectedDate,
    currentMonth,
    selectDate,
    navigateMonth,
  } = useCalendar();

  // Use these variables and functions to build your calendar UI
  return <div>...</div>;
}
```

## API

### `useCalendar()`

The `useCalendar` hook generates and returns the following data and functions:

- `today`: The current date
- `currentScope`: An array of objects representing the dates to be displayed in the calendar. Each object has a `date` string, and optional `isCurrentMonth`, `isToday`, and `isSelected` booleans.
- `selectedDate`: The currently selected date
- `currentMonth`: The current month that the calendar is displaying
- `selectDate(date: Date)`: A function that sets the selected date
- `navigateMonth(offset: number)`: A function that changes the current month by the provided offset (positive for future months, negative for past months)

## License

MIT
