// pages/students/index.tsx

import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Student } from '../../lib/types'; // Adjust the path based on your project structure
import Layout from '@/components/Layout'; // Optional: Use your Layout component for consistent styling

const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/students');
        if (!response.ok) {
          throw new Error(`Failed to fetch students: ${response.statusText}`);
        }
        const data: Student[] = await response.json();
        setStudents(data);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Unable to load students. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <Layout> {/* Optional: Remove if not using a Layout component */}
      <Head>
        <title>Student List</title>
        <meta name="description" content="List of all students" />
      </Head>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Student List</h1>
        {isLoading && <p>Loading students...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && !error && (
          <>
            {students.length === 0 ? (
              <p>No students found.</p>
            ) : (
              <ul className="list-disc pl-5">
                {students.map((student) => (
                  <li key={student.id} className="mb-2">
                    <Link href={`/students/${student.id}`} className="text-blue-600 hover:underline">
                      {student.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
        <div className="mt-6">
        <Link href="/students/new" className="text-green-600 hover:underline">
          Add New Student
        </Link>
        </div>
      </main>
    </Layout> 
  );
};

export default Students;
