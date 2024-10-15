// lib/serverDb.ts

import fs from 'fs/promises';
import path from 'path';
import { Student } from './types';

// Helper function to get the database file path
const getDbFilePath = (): string => {
  return path.join(process.cwd(), 'db.json');
};

// Server-side operations
export const serverDb = {
  // Read and parse the db.json file
  readDb: async (): Promise<{ students: Student[] }> => {
    try {
      const fileData = await fs.readFile(getDbFilePath(), 'utf-8');
      return JSON.parse(fileData);
    } catch (error) {
      console.error('Error reading db.json:', error);
      throw new Error('Failed to read database');
    }
  },

  // Write data to the db.json file
  writeDb: async (data: { students: Student[] }): Promise<void> => {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      await fs.writeFile(getDbFilePath(), jsonData, 'utf-8');
    } catch (error) {
      console.error('Error writing to db.json:', error);
      throw new Error('Failed to write to database');
    }
  },

  // Fetch all students
  getAllStudents: async (): Promise<Student[]> => {
    const db = await serverDb.readDb();
    return db.students;
  },

  // Fetch student by ID
  getStudentById: async (id: string): Promise<Student | undefined> => {
    const db = await serverDb.readDb();
    return db.students.find((student) => student.id === id);
  },

  // Add a new student
  addStudent: async (newStudent: Student): Promise<Student> => {
    const db = await serverDb.readDb();
    db.students.push(newStudent);
    await serverDb.writeDb(db);
    return newStudent;
  },

  // Update student details
  updateStudent: async (
    id: string,
    updatedFields: Partial<Student>
  ): Promise<Student | undefined> => {
    const db = await serverDb.readDb();
    const studentIndex = db.students.findIndex((student) => student.id === id);

    if (studentIndex === -1) {
      return undefined; // Student not found
    }

    db.students[studentIndex] = { ...db.students[studentIndex], ...updatedFields };
    await serverDb.writeDb(db);
    return db.students[studentIndex];
  },

  // Delete student by ID
  deleteStudent: async (id: string): Promise<boolean> => {
    const db = await serverDb.readDb();
    const initialLength = db.students.length;
    db.students = db.students.filter((student) => student.id !== id);

    if (db.students.length === initialLength) {
      return false; // No student was deleted
    }

    await serverDb.writeDb(db);
    return true; // Deletion successful
  },
};
