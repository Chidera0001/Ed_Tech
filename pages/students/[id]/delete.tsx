import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';

// Client-side function to delete a student
const deleteStudentClient = async (id: string) => {
  const response = await axios.delete(`/api/students/${id}`);
  if (response.status !== 200) {
    throw new Error('Failed to delete student');
  }
};

const DeleteStudent = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!id || typeof id !== 'string') return;
    try {
      setIsDeleting(true);
      setError(null);
      await deleteStudentClient(id);
      router.push('/students');
    } catch (error) {  // Changed err to error here
      console.error(error); // Log the error for debugging
      setError('Failed to delete student. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Delete Student</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Delete Student</h1>
      <p className="mb-4">Are you sure you want to delete this student?</p>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex gap-4">
        <button 
          onClick={handleDelete} 
          disabled={isDeleting}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
        <button 
          onClick={handleCancel}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteStudent;
