// components/StudentCard.tsx

import React from 'react';
import Link from 'next/link';
import { Student } from '../lib/types';

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <h2 className="text-xl font-semibold mb-2">{student.name}</h2>
      <p><strong>Registration Number:</strong> {student.registrationNumber}</p>
      <p><strong>Major:</strong> {student.major}</p>
      <p><strong>Date of Birth:</strong> {new Date(student.dob).toLocaleDateString()}</p>
      <p><strong>GPA:</strong> {student.gpa.toFixed(2)}</p>
      
      <div className="mt-4 flex space-x-2">
        <Link href={`/students/${student.id}`} className="text-blue-600 hover:underline">
            View
        </Link>
        <Link href={`/students/${student.id}/edit`} className="text-green-600 hover:underline">
          Edit
        </Link>
        {/* Add delete functionality as needed */}
      </div>

    </div>
  );
};

export default StudentCard;
