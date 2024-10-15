# **Student Information Management System.....ED_TECH**  
A simple student information management system built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Chakra UI**. This project allows users to **view, add, edit, and delete student records**, providing a clean and responsive interface.

---

## **Table of Contents**
1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Screenshots](#screenshots)  
4. [Getting Started](#getting-started)  
5. [API Endpoints](#api-endpoints)  
6. [Project Structure](#project-structure)  
7. [How to Use](#how-to-use)  
8. [Bonus Features](#bonus-features)  
9. [Contributing](#contributing)  
10. [License](#license)

---

## **Features**
- **Student List Page:**  
  View all students with their names, registration numbers, and majors.  
  - Each student links to a **detailed profile** page.

- **Dynamic Student Detail Page:**  
  Each student has a dynamic route (`/students/[id]`) displaying:
  - Name  
  - Registration Number  
  - Major  
  - Date of Birth  
  - GPA  

- **Add/Edit Student:**  
  Users can:
  - Add a new student via the `/students/new` form.
  - Edit student records with `/students/[id]/edit`.

- **Delete Functionality:**  
  Users can delete a student directly from their detail page.

- **API Routes:**  
  Manage student data via RESTful API routes.

- **Search and Filter:**  
  Search students by name, major, or GPA.

---

## **Tech Stack**
- **Framework:** Next.js (React)  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS & Chakra UI  
- **Database:** In-memory or local JSON file for backend simulation  
- **Testing:** Jest & React Testing Library (optional)  

---

## **Screenshots**
> Add screenshots of your application to visually demonstrate its features.

- **Landing Page:**  
  _A list of all students with their names and majors._  
  ![Landing Page](screenshots/landing-page.png)  

- **Student Detail Page:**  
  _A dynamic page showing the student's full profile._  
  ![Student Detail](screenshots/student-detail.png)  

- **Add New Student Form:**  
  _Form for adding a new student to the system._  
  ![Add Student](screenshots/add-student.png)  

- **Edit Student Form:**  
  _Edit the student’s details._  
  ![Edit Student](screenshots/edit-student.png)  

- **Delete Confirmation:**  
  _Confirmation popup before deleting a student._  
  ![Delete Confirmation](screenshots/delete-confirmation.png)  

---

## **Getting Started**
Follow these steps to set up the project on your local machine.

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Basic knowledge of TypeScript and React

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/student-management-system.git
   cd student-management-system
