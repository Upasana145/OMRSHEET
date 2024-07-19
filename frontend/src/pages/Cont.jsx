import React, { useState } from "react";

function Contact() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    startdate: "",
  });

  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({ ...data, [name]: value });
  };
  console.log(data);

  return (
    <section className="contact">
      <h2 data-aos="fade-right">
        Contact <span>Me</span>
      </h2>
      <form action="#">
        <div className="input-box">
          <div
            className="input-field"
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
          >
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={data.name}
              onChange={handleInputs}
            />
            <span className="focus"></span>
          </div>

          <div className="form-input form-start">
            <label htmlFor="">Start Date</label>
            <input
              type="Date"
              name="date"
              value={data.startdate}
              onChange={handleInputs}
              id="startdate"
            />
          </div>
          <div className="form-input form-end">
            <label htmlFor="">End Date</label>
            <input type="Date" id="enddate" />
          </div>
          <div className="form-btn">
            <button type="submit">Check</button>
          </div>

          <div
            className="input-field"
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
          >
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={data.email}
              onChange={handleInputs}
            />
            <span className="focus"></span>
          </div>
          <div
            className="input-field"
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
          >
            <input
              type="number"
              placeholder="Phone"
              required
              name="phone"
              value={data.phone}
              onChange={handleInputs}
            />
            <span className="focus"></span>
          </div>
          <div
            className="input-field"
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
          >
            <input
              type="text"
              placeholder="Subject"
              required
              name="subject"
              value={data.subject}
              onChange={handleInputs}
            />
            <span className="focus"></span>
          </div>

          <div
            className="text-area"
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
          >
            <textarea
              name="message"
              id=""
              cols="30"
              rows="9"
              placeholder="Message"
              required
              value={data.message}
              onChange={handleInputs}
            ></textarea>
            <span className="focus"></span>
          </div>

          <div className="submit-btn-div" data-aos="zoom-in-right">
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Contact;
