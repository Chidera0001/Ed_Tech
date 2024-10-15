// components/StudentList.tsx

import React, { useEffect, useState } from 'react';
import { clientDb } from '../lib/clientDb';
import { Student } from '../lib/types';

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await clientDb.getAllStudents();
        setStudents(data);
        setFilteredStudents(data);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to load students. Please try again later.');
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.major.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [searchTerm, students]);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search students..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <ul>
        {filteredStudents.map((student) => (
          <li key={student.id} className="border p-4 mb-2">
            <h2 className="text-xl">{student.name}</h2>
            <p>Registration Number: {student.registrationNumber}</p>
            <p>Major: {student.major}</p>
            <p>Date of Birth: {student.dob}</p>
            <p>GPA: {student.gpa}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
