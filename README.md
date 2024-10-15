# Student Information Management System

## Project Overview

This is a Student Information Management System built with Next.js, TypeScript, and Tailwind CSS. The system allows users to view, add, edit, and delete student records through a user-friendly web interface.

## Screenshots

Here are some screenshots of the application:

### Student List Page
![Student List Page](/images/srudent-list.png)
*This page displays all students with their basic information.*

### Edit Student Form
![Add/Edit Student Form](/images/edit-student.png)
*Form for editing existing student information.*

### Add Student Form
![Add/Edit Student Form](/images/add-student.png)
*Form for adding a new student *

### Search and Filter
![Search and Filter](/images/search.png)
*Search and filter functionality to easily find specific students.*

*Note: These are placeholder images. Replace them with actual screenshots of your application once it's developed.*

## Features

1. **Student List Page** (`/students`)
   - Displays all students with their names, registration numbers, and majors
   - Links to individual student detail pages

2. **Dynamic Student Detail Page** (`/students/[id]`)
   - Shows full profile information for each student:
     - Name
     - Registration Number
     - Major
     - Date of Birth
     - GPA
   - Implements server-side rendering (SSR) or static site generation (SSG)

3. **Add/Edit Student**
   - Add new student records (`/students/new`)
   - Edit existing student records (`/students/[id]/edit`)
   - Form for collecting student information

4. **Delete Student**
   - Functionality to remove a student from the system

5. **API Routes**
   - `GET /api/students`: Fetch all students
   - `POST /api/students`: Add a new student
   - `GET /api/students/[id]`: Fetch a single student's details
   - `PUT /api/students/[id]`: Update a student's details
   - `DELETE /api/students/[id]`: Delete a student

6. **Database Integration**
   - Uses an in-memory database or local file for data storage

7. **TypeScript & Tailwind CSS**
   - Project is written in TypeScript
   - Styled using Tailwind CSS for responsive design
   - Utilizes Chakra UI as the UI library

## Bonus Features

1. **Search/Filter**
   - Allows filtering students by name, major, or GPA

2. **Form Validation**
   - Client-side and server-side validation for form inputs

3. **Unit Tests**
   - Includes unit tests for critical components using Jest or React Testing Library

4. **Authentication** (Optional)
   - Basic user authentication for accessing the system

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Chakra UI
- Jest (for testing)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/student-information-system.git
   ```

2. Navigate to the project directory:
   ```
   cd student-information-system
   ```

3. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

4. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
student-information-system/
│
├── pages/
│   ├── api/
│   │   └── students/
│   │       └── [id].ts
│   ├── students/
│   │   ├── [id]/
│   │   │   └── edit.tsx
│   │   ├── [id].tsx
│   │   ├── index.tsx
│   │   └── new.tsx
│   └── _app.tsx
│
├── components/
│   ├── StudentList.tsx
│   ├── StudentForm.tsx
│   └── StudentDetails.tsx
│
├── styles/
│   └── globals.css
│
├── lib/
│   └── db.ts
│
├── types/
│   └── student.ts
│
├── tests/
│   └── components/
│       └── StudentForm.test.tsx
│
├── public/
│   └── screenshots/
│       ├── student-list.png
│       ├── student-detail.png
│       ├── student-form.png
│       └── search-filter.png
│
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Miva University for the project requirements
- Next.js documentation
- Tailwind CSS documentation
- Chakra UI documentation