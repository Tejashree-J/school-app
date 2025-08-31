"use client";
import { useEffect, useState } from "react";
import "./showSchools.css";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch("/api/schools")
      .then((res) => res.json())
      .then((data) => setSchools(data));
  }, []);

  return (
    <div className="school-grid">
      {schools.map((s) => (
        <div key={s.id} className="school-card">
          <img src={s.image} alt={s.name} />
          <h2>{s.name}</h2>
          <p>{s.address}</p>
          <p>{s.city}</p>
        </div>
      ))}
    </div>
  );
}
