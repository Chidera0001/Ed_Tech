import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Student Management System' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content="A Next.js application for managing students" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Header */}
      <header className="bg-green-600 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Left: Logo/Title */}
            <Link href="/">
              <span className="text-xl font-bold cursor-pointer">Student Management</span>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/students">
                <span className="hover:underline cursor-pointer">Students</span>
              </Link>
              <Link href="/students/new">
                <span className="hover:underline cursor-pointer">Add Student</span>
              </Link>
            </nav>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 space-y-2">
              <Link href="/students">
                <span className="block hover:underline cursor-pointer py-2">Students</span>
              </Link>
              <Link href="/students/new">
                <span className="block hover:underline cursor-pointer py-2">Add Student</span>
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6">
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