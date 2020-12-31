import React, { useEffect, useState } from "react";
import "./App.css";
import { axios } from "./axios";
import { Reminder } from "./components/reminder";

function App() {
  const [reminders, setReminders] = useState([]);
  const [formData, setFormData] = useState([]);

  const noReminders = !reminders || (reminders && reminders.length === 0);

  const getReminders = async () => {
    const response = await axios
      .get("/reminders")
      .catch((err) => console.log("Error", err));
    console.log("Response: ", response);
    if (response && response.data) setReminders(response.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const addReminder = async (e) => {
    e.preventDefault();
    console.log("addReminder", formData);
    const response = await axios
      .post("/reminders", formData)
      .catch((err) => console.log("Error", err));
    if (response) getReminders();
  };

  const deleteReminder = async (id) => {
    const response = await axios
      .delete("/reminders/" + id)
      .catch((err) => console.log("Error", err));
    if (response) getReminders();
  };
  useEffect(() => {
    console.log("in method hook - useEffect()");
    getReminders();
  }, []);

  return (
    <div className="App">
      <div className="reminder-list">
        <h3>Reminders</h3>
        {!noReminders &&
          reminders.map((reminder, index) => (
            <Reminder key={index} {...reminder} onDelete={deleteReminder} />
          ))}
      </div>
      <h3>Add Reminder</h3>
      <form onSubmit={addReminder}>
        <label htmlFor="id">Id</label>
        <input name="id" placeholder="Id" onChange={handleChange} />
        <label htmlFor="reminder">Reminder</label>
        <input name="reminder" placeholder="Reminder" onChange={handleChange} />
        <label htmlFor="time">Time</label>
        <input name="time" placeholder="Time" onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
