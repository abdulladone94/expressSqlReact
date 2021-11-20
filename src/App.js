import "./App.css";
import { useState } from "react";
const Axios = require("axios");

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("0");
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState("0");

  const [callEmp, setCallEmp] = useState([]);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setCallEmp([
        ...callEmp,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const showEmp = () => {
    Axios.get("http://localhost:3001/employee").then((response) => {
      setCallEmp(response.data);
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <label>Country:</label>
        <input
          type="text"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
        <label>Position:</label>
        <input
          type="text"
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        />
        <label>Wages(year):</label>
        <input
          type="number"
          onChange={(e) => {
            setWage(e.target.value);
          }}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div>
        <hr />
        <div className="information">
          <button onClick={showEmp}>Show Employee Details</button>
          {callEmp.map((val, key) => {
            return (
              <div className="empDetails">
                <div>
                  <h3>Name: {val.name} </h3>
                  <h3>Position: {val.position} </h3>
                  <h3>Wages: {val.wage} </h3>
                </div>
                <div>
                  <input type="text" placeholder="Edit your Name" />
                  <button>Update</button> <br />
                  <input type="text" placeholder="Edit your Position" />
                  <button>Update</button> <br />
                  <input type="number" placeholder="Edit your Wage" />
                  <button>Update</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
