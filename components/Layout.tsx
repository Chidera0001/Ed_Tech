// components/Layout.tsx

import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Student Management System' }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content="A Next.js application for managing students" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Header */}
      <header className="bg-green-600 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Left: Logo/Title */}
          <Link href="/">
            <span className="text-xl font-bold cursor-pointer">Student Management</span>
          </Link>

            {/* Right: Navigation Links with equal spacing */}
            <nav className="flex space-x-8">
              <Link href="/students">
                <span className="hover:underline cursor-pointer">Students</span>
              </Link>
              <Link href="/students/new">
                <span className="hover:underline cursor-pointer">Add Student</span>
              </Link>
            </nav>
          </div>
        </header>

      
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-200 text-center py-4">
        <p className="text-sm text-gray-600">© {new Date().getFullYear()} Student Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
