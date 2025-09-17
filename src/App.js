import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [editId, setEditId] = useState(null);
  useEffect(() => { const saved = localStorage.getItem("students");
    if (saved) setStudents(JSON.parse(saved));}, []);
  useEffect(() => {localStorage.setItem("students", JSON.stringify(students));}, [students]);
  const handleSubmit = (e) =>{ e.preventDefault();
    if (!name || !age || !grade) return;
    if (editId) {setStudents(students.map((s) => s.id === editId ? { id: editId, name, age, grade } : s ));
      setEditId(null);} 
    else { setStudents([...students, { id: Date.now(), name, age, grade }]);
    }
     setName("");
     setAge("");
     setGrade("");
  };
  const handleEdit = (stu) => {
    setName(stu.name);
    setAge(stu.age);
    setGrade(stu.grade);
    setEditId(stu.id);
  };
  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };
  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h1>Student Dashboard</h1>

      <form className="form" onSubmit={handleSubmit}>
        <center>
        <table>
          <tr>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </tr>
        <tr>
        <input
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        /></tr>
        <tr>
        <input
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        /></tr>
        <center>
        <button type="submit">{editId ? "Update" : "Add"}</button></center>
        </table>
        </center>
      </form>
     
      <ol>
        {students.map((s) => (
          <li key={s.id}>
            <center>
            <table border="1">
              
              <tr>
              <th>Name</th>
                <th>Age</th>
                <th>Grade</th>
             
             
              </tr>
              <td>{s.name} </td>
              <td>{s.age} </td>
              <td>{s.grade} </td>
            </table>
             <button onClick={() => handleEdit(s)}>Edit</button>
             <button className="button1" onClick={() => handleDelete(s.id)}>Delete</button>
             </center>
          </li>
          
        ))}
      </ol>
    </div>
  );
}

export default App;
