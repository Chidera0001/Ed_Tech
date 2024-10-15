// components/StudentForm.tsx

import React, { useState, FormEvent } from 'react';
import { Student } from '../lib/types';
import { useRouter } from 'next/router';

interface StudentFormProps {
  initialData?: Student;
  onSubmit: (data: Omit<Student, 'id'>) => Promise<void>;
  submitText: string;
}

const StudentForm: React.FC<StudentFormProps> = ({ initialData, onSubmit, submitText }) => {
  const [name, setName] = useState<string>(initialData?.name || '');
  const [registrationNumber, setRegistrationNumber] = useState<string>(initialData?.registrationNumber || '');
  const [major, setMajor] = useState<string>(initialData?.major || '');
  const [dob, setDob] = useState<string>(initialData?.dob || '');
  const [gpa, setGpa] = useState<number>(initialData?.gpa || 0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!name || !registrationNumber || !major || !dob || gpa < 0 || gpa > 4) {
      setError('Please fill in all fields correctly.');
      return;
    }

    try {
      await onSubmit({ name, registrationNumber, major, dob, gpa });
      router.push('/students');
    } catch (err) {
      setError('An error occurred while submitting the form.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{submitText}</h2>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="registrationNumber" className="block text-gray-700">Registration Number:</label>
        <input
          type="text"
          id="registrationNumber"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="major" className="block text-gray-700">Major:</label>
        <input
          type="text"
          id="major"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="dob" className="block text-gray-700">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="gpa" className="block text-gray-700">GPA:</label>
        <input
          type="number"
          id="gpa"
          value={gpa}
          onChange={(e) => setGpa(parseFloat(e.target.value))}
          step="0.01"
          min="0"
          max="4"
          className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        {submitText}
      </button>
    </form>
  );
};

export default StudentForm;
