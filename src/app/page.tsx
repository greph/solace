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
      (response.json() as Promise<{ data: Advocate[] }>).then(
        (jsonResponse) => {
          setAdvocates(jsonResponse.data);
          setFilteredAdvocates(jsonResponse.data);
        }
      );
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
    <main className="max-w-screen-2xl mx-auto px-6 py-8 bg-gray">
      <h1 className="font-serif text-4xl text-[#00443E] mb-6 mt-6">
        Solace Advocates
      </h1>
      <section className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex flex-col sm:flex-row w-full sm:w-auto">
            <input
              className="w-full sm:w-auto border border-gray-300 rounded-l-md h-10 px-4 py-2 mb-2 sm:mr-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#007D61]"
              type="text"
              value={searchTerm}
              onChange={onChange}
              placeholder="Search by name, city, degree, specialty.."
            />
            <button
              onClick={onClick}
              className="bg-[#00443E] hover:bg-[#007D61] text-white h-10 px-4 py-2 rounded-r-md focus:outline-none focus:ring-2 focus;ring-[#007D61]"
            >
              Reset
            </button>
          </div>
          <p className="mt-4 sm:mt-0 text-gray-700">
            Searching for:{" "}
            <span className="font-medium">
              {searchTerm ? searchTerm : "--"}
            </span>
          </p>
        </div>
      </section>

      {/* MOBILE CARDS */}
      <div className="space-y-4 sm:hidden">
        {filteredAdvocates.map((advocate) => (
          <div
            key={advocate.id}
            className="bg-white border border-gray-200 rounded-lg shadow p-4"
          >
            <p className="text-lg font-semibold text-[#00443E] mb-1">
              {advocate.firstName} {advocate.lastName}
            </p>
            <p className="text-sm text-gray-800 mb-1">{advocate.city}</p>
            <p className="text-sm text-gray-800 mb-1">{advocate.degree}</p>
            <div className="text-sm text-gray-800 mb-1">
              <ul className="list-disc list-inside">
                <p className="font-semibold mb-1">Specialties:</p>
                {advocate.specialties.map((s, idx) => (
                  <li key={`${advocate.id}-specialty-${idx}`}>{s}</li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-gray-800 mb-1">
              {advocate.yearsOfExperience}
            </p>
            <p className="text-sm text-gray-800 mb-1">{advocate.phoneNumber}</p>
          </div>
        ))}
        {filteredAdvocates.length === 0 && (
          <div className="p4">
            <p className="text-center text-gray-500">No advocates found.</p>
          </div>
        )}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full bg-white shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-[#E6F2F1]">
            <tr>
              {[
                "First Name",
                "Last Name",
                "City",
                "Degree",
                "Specialties",
                "Years of Experience",
                "Phone Number",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-sm font-semibold text-[#00443E] uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAdvocates.map((advocate) => {
              return (
                <tr
                  key={advocate.id}
                  className="hover:bg-[#F7FAF9] transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {advocate.firstName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {advocate.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {advocate.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {advocate.degree}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {advocate.specialties.map((s, idx) => (
                      <div key={`${advocate.id}-specialty-${idx}`}>{s}</div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {advocate.yearsOfExperience}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {advocate.phoneNumber}
                  </td>
                </tr>
              );
            })}
            {filteredAdvocates.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No advocates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
