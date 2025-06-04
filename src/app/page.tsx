"use client";

import { useEffect, useState, ChangeEvent } from "react";

interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
}

export default function Home(): JSX.Element {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      (response.json() as Promise<{ data: Advocate[] }>)
      .then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    const results = advocates.filter((advocate) => {
      const lowercaseSearchTerm = term.toLowerCase();
      return (
        advocate.firstName.toLowerCase().includes(lowercaseSearchTerm) ||
        advocate.lastName.toLowerCase().includes(lowercaseSearchTerm) ||
        advocate.city.toLowerCase().includes(lowercaseSearchTerm) ||
        advocate.degree.toLowerCase().includes(lowercaseSearchTerm) ||
        advocate.specialties.some((s) =>
          s.toLowerCase().includes(lowercaseSearchTerm)
       ) ||
        advocate.yearsOfExperience.toString().includes(lowercaseSearchTerm)
      );
    });

    setFilteredAdvocates(results);
  };

  const onClick = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: {searchTerm ? searchTerm : "--"}
        </p>
        <input type="text"
        value={searchTerm} style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.id}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s, idx) => (
                    <div key={`${advocate.id}-specialty-${idx}`}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
