import React from "react";
import Select from "react-select";

// Import your CSS file
const options = [
  { value: "Safty", label: "Safety/PPE-KIT" },
  { value: "Moulding", label: "Moulding" },
  { value: "Visual Inspection", label: "Visual Inspection" },
];
function Header({ handleOptionSelect }) {
  return (
    <div>
      <header className="header">
        <div className="subchild">
          <Select
            placeholder="Choose"
            options={options}
            onChange={handleOptionSelect}
          />
        </div>
      </header>
    </div>
  );
}

export default Header;
