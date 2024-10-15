// lib/clientDb.ts

import { Student } from './types';

// Client-side API operations
export const clientDb = {
  getAllStudents: async (): Promise<Student[]> => {
    const response = await fetch('/api/students');
    if (!response.ok) {
      throw new Error('Failed to fetch students');
    }
    return response.json();
  },

  getStudentById: async (id: string): Promise<Student | undefined> => {
    const response = await fetch(`/api/students/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return undefined;
      }
      throw new Error('Failed to fetch student');
    }
    return response.json();
  },

  addStudent: async (newStudent: Student): Promise<Student> => {
    const response = await fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    });
    if (!response.ok) {
      throw new Error('Failed to add student');
    }
    return response.json();
  },

  updateStudent: async (id: string, updatedFields: Partial<Student>): Promise<Student> => {
    const response = await fetch(`/api/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    });
    if (!response.ok) {
      throw new Error('Failed to update student');
    }
    return response.json();
  },

  deleteStudent: async (id: string): Promise<boolean> => {
    const response = await fetch(`/api/students/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete student');
    }
    return response.json();
  },
};
