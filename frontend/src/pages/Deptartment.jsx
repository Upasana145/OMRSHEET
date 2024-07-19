import React from "react";
import { useState } from "react";

const Deptartment = () => {
  const [form, setForm] = useState({
    name: "",
    city: "",
    gender: "",
    parent: "",
  });

  console.log(form, "form");
  // const formhandlename = () => {
  //   setForm();
  // };

  // const handlechange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   // const newValue = type === 'checkbox' ? checked : value;

  //   setForm({
  //     ...form,
  //     [name]: name,
  //   });
  // };

  return (
    <>
      {/* <h1>This is Department</h1> */}
      <div className="mb-3">
        <label for="" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          id=""
          aria-describedby="helpId"
          placeholder=""
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <small id="helpId" className="form-text text-muted">
          Help text
        </small>
        <label for="" className="form-label">
          Parent
        </label>
        <input
          type="text"
          className="form-control"
          name="parent"
          id=""
          aria-describedby="helpId"
          placeholder=""
          value={form.name}
          onChange={(e) => setForm({ ...form, parent: e.target.value })}
        />
        <small id="helpId" className="form-text text-muted">
          Help text
        </small>
        <div class="mb-3">
          <label for="" class="form-label">
            City
          </label>
          <select
            class="form-select form-select-lg"
            name=""
            id=""
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          >
            <option selected>Select one</option>
            <option value="new delhi">New Delhi</option>
            <option value="istanbul">Istanbul</option>
            <option value="jakarta">Jakarta</option>
          </select>
        </div>
        <p>Please select your favorite Web language:</p>
          <input
          type="radio"
          id="html"
          name="fav_language"
          value="HTML"
        />  <label for="html">HTML</label>
          <input type="radio" id="css" name="fav_language" value="CSS" /> {" "}
        <label for="css">CSS</label> {" "}
        <input
          type="radio"
          id="javascript"
          name="fav_language"
          value="JavaScript"
        />
          <label for="javascript">JavaScript</label>
      </div>
    </>
  );
};

export default Deptartment;
