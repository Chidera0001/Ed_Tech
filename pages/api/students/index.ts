// pages/api/students/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { serverDb } from '../../../lib/serverDb'; // Import server-side db functions
import { Student } from '../../../lib/types';
import { v4 as uuidv4 } from 'uuid';

const studentsApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const students = await serverDb.getAllStudents(); // Fetch all students
        res.status(200).json(students); // Return the students
      } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Failed to fetch students' });
      }
      break;

    case 'POST':
      try {
        const newStudent: Student = {
          id: uuidv4(), // Generate a new ID
          ...req.body, // Spread in the rest of the data
        };
        const addedStudent = await serverDb.addStudent(newStudent);
        res.status(201).json(addedStudent);
      } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ error: 'Failed to add student' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
};

export default studentsApiHandler;
