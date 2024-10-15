import { NextApiRequest, NextApiResponse } from 'next';
import { serverDb } from '../../../lib/serverDb'; // Import server-side db functions

const studentApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid student ID' });
  }

  switch (method) {
    case 'GET':
      try {
        const student = await serverDb.getStudentById(id);
        if (student) {
          res.status(200).json(student);
        } else {
          res.status(404).json({ error: 'Student not found' });
        }
      } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ error: 'Failed to fetch student' });
      }
      break;

    case 'PUT':
      try {
        const updatedStudent = await serverDb.updateStudent(id, req.body);
        if (updatedStudent) {
          res.status(200).json(updatedStudent);
        } else {
          res.status(404).json({ error: 'Student not found' });
        }
      } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ error: 'Failed to update student' });
      }
      break;

    case 'DELETE':
      try {
        const deletionSuccess = await serverDb.deleteStudent(id);
        if (deletionSuccess) {
          res.status(204).end(); // No Content
        } else {
          res.status(404).json({ error: 'Student not found' });
        }
      } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Failed to delete student' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
};

export default studentApiHandler;
