// pages/students/[id].tsx

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
}

const StudentDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Type inference for id will be string | string[] | undefined
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!id) return; // Don't fetch if id is not available yet
      
      try {
        const response = await fetch(`/api/students/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch student');
        }
        const data = await response.json();
        setStudent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentData();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this student?')) return;
    
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete student');
      }
      router.push('/students');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete student');
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>; // Optional: Replace with a spinner or skeleton loader
  }
  if (error) {
    return (
      <div className="text-center text-red-500">
        <h2>Error: {error}</h2>
      </div>
    );
  }
  if (!student) {
    return (
      <div className="text-center">
        <h2>Student not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Head>
        <title>{student.name || 'Student Detail'}</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">{student.name}</h1>
      <ul className="mb-4">
        <li><strong>Registration Number:</strong> {student.registrationNumber}</li>
        <li><strong>Major:</strong> {student.major}</li>
        <li><strong>Date of Birth:</strong> {student.dob}</li>
        <li><strong>GPA:</strong> {student.gpa}</li>
      </ul>
      <div className="space-x-4">
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          onClick={() => router.push(`/students/${id}/edit`)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          onClick={() => router.push('/students')}
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default StudentDetail;
