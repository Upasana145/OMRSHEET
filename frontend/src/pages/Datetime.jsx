// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const DateTimePickerExample = () => {
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   return (
//     <>
//       <div>
//         <h1>React Datetime Picker Example</h1>
//         <div>
//           <DatePicker
//             className="datepicker"
//             selected={selectedDate}
//             onChange={handleDateChange}
//             showTimeSelect
//             timeFormat="HH:mm"
//             timeIntervals={15}
//             dateFormat="MMMM d, yyyy h:mm aa"
//             placeholderText="Select a date and time"
//           />
//           <span className="datepicker-icon">
//             <i className="fa-regular fa-calendar-days"></i>
//           </span>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DateTimePickerExample;

// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
// // import "./DateTimePicker.css"; // You can create a CSS file for styling

// const DateTimePickerExample = () => {
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   return (
//     <div className="datetime-picker-container">
//       <h1>React Datetime Picker Example</h1>
//       <div className="datetime-picker">
//         <DatePicker
//           selected={selectedDate}
//           onChange={handleDateChange}
//           showTimeSelect
//           timeFormat="HH:mm"
//           timeIntervals={15}
//           dateFormat="MMMM d, yyyy h:mm aa"
//           placeholderText="Select a date and time"
//         />
//         <span className="datepicker-icon">
//           <FontAwesomeIcon icon={faCalendarDays} />
//         </span>
//       </div>
//     </div>
//   );
// };

// export default DateTimePickerExample;
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendar } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
// import "./DateTimePicker.css";

const DateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handleIconClick = () => {
    setIsPickerVisible(!isPickerVisible);
  };

  return (
    <div className="datetime-picker">
      <div className="icon-wrapper" onClick={handleIconClick}>
        <FaCalendar className="calendar-icon" />
      </div>
      {isPickerVisible && (
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          className="date-picker-input"
        />
      )}
    </div>
  );
};

export default DateTimePicker;
