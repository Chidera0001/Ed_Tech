import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';


interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  gpa: number;
}

const HomePage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      setStudents(response.data as Student[]);
      setFilteredStudents(response.data as Student[]);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term) {
      const filtered = students.filter((student) =>
        student.name && student.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    if (confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`/api/students/${id}`);
        fetchStudents();
      } catch (error) {
        console.error('Failed to delete student:', error);
      }
    }
  };

  return (
    <Layout title="Student Management Dashboard">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-green-600">
          Student Management Dashboard
        </h1>

        <div className="flex justify-between items-center mb-6">
          <SearchBar
            searchTerm={searchTerm}
            onSearch={handleSearch}
            query={''}
            setQuery={() => {}}
          />
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => (window.location.href = '/students/new')}
          >
            Add Student
          </button>
        </div>

        <div className="overflow-hidden rounded-lg shadow-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-green-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Registration Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Major
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  GPA
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.registrationNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.major}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.gpa}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <Link href={`/students/${student.id}/edit`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
                      onClick={() => handleDeleteStudent(student.id)}
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
    </Layout>
  );
};

export default HomePage;
