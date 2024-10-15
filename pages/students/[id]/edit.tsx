// pages/students/[id]/edit.tsx

import { GetServerSideProps } from 'next';
import Layout from '../../../components/Layout';
import StudentForm from '../../../components/StudentForm';
import { Student } from '../../../lib/types';
import { clientDb } from '../../../lib/clientDb'; // Import only client-side operations
import { serverDb } from '../../../lib/serverDb'; // Import server-side operations in getServerSideProps
import { useRouter } from 'next/router';
import { useState } from 'react';

interface EditStudentPageProps {
  student: Student | null;
}

const EditStudentPage: React.FC<EditStudentPageProps> = ({ student }) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  if (!student) {
    return (
      <Layout title="Student Not Found">
        <p className="text-center text-red-500">Student not found.</p>
      </Layout>
    );
  }

  const handleUpdateStudent = async (data: Omit<Student, 'id'>) => {
    setError(null); // Reset error state
    try {
      await clientDb.updateStudent(student.id, data); // Use client-side API call
      // Redirect to student detail page after successful update
      router.push(`/students/${student.id}`);
    } catch (err) {
      console.error('Update student error:', err);
      setError('Failed to update student. Please try again.');
    }
  };

  return (
    <Layout title="Edit Student">
      {error && <p className="text-center text-red-500">{error}</p>}
      <StudentForm
        initialData={student}
        onSubmit={handleUpdateStudent}
        submitText="Update Student"
      />
    </Layout>
  );
};

// Fetch the student data on the server side
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params ?? {};

  if (!id || typeof id !== 'string') {
    return {
      notFound: true, // Return a 404 page if ID is missing or invalid
    };
  }

  try {
    const student = await serverDb.getStudentById(id); // Use server-side operation
    return {
      props: {
        student: student || null,
      },
    };
  } catch (error) {
    console.error('Error fetching student:', error);
    return {
      props: {
        student: null,
      },
    };
  }
};

export default EditStudentPage;
