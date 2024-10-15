// pages/students/new.tsx

import Layout from '../../components/Layout';
import StudentForm from '../../components/StudentForm';
import { Student } from '../../lib/types';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddStudentPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddStudent = async (data: Omit<Student, 'id'>) => {
    setIsLoading(true);
    setError(null); // Reset error state before adding a student

    const newStudent: Student = { id: uuidv4(), ...data }; // Create a new student with a generated ID

    try {
      // Send a POST request to the API endpoint to add the student
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
        },
        body: JSON.stringify(newStudent), // Convert student data to JSON
      });

      if (!response.ok) {
        throw new Error('Failed to add student'); // Throw error if response is not OK
      }

      // Redirect to students list after successful addition
      router.push('/students');
    } catch (err) {
      // Handle errors gracefully
      setError(err instanceof Error ? err.message : 'Failed to add student');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Add New Student">
      {error && <p className="text-red-500">{error}</p>} {/* Show error message if any */}
      {isLoading ? (
        <p>Loading...</p> // Show loading indicator while processing
      ) : (
        <StudentForm onSubmit={handleAddStudent} submitText="Add Student" />
      )}
    </Layout>
  );
};

export default AddStudentPage;
