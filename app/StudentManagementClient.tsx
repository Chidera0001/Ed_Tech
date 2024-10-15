'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
}

export default function StudentManagementClient() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/students');
      setStudents(response.data as Student[]);
    } catch (error) {
      setError('Failed to fetch students');
      console.error(error); // Log error for debugging
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStudent = () => {
    router.push('/students/add');
  };

  const handleEditStudent = (student: Student) => {
    router.push(`/students/edit/${student.id}`);
  };

  const handleDeleteStudent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`/api/students/${id}`);
        fetchStudents();
      } catch (error) {
        setError('Failed to delete student');
        console.error(error); // Log error for debugging
      }
    }
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Student Management</h2>
        <button 
          onClick={handleAddStudent}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Add New Student
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Major</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GPA</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.registrationNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.major}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.gpa}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button 
                    onClick={() => handleEditStudent(student)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteStudent(student.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
