// lib/types.ts

import { NextApiRequest, NextApiResponse } from "next";

/**
 * Interface representing a Student entity.
 */
export interface Student {
    id: string;
    name: string;
    registrationNumber: string;
    major: string;
    dob: string; // Date of Birth in YYYY-MM-DD format
    gpa: number;
}

/**
 * Generic API Response Interface.
 * Useful for standardizing API responses.
 */
export interface ApiResponse<T> {
    data?: T;
    error?: string;
}

/**
 * Supported HTTP Methods for API Routes.
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Interface for API Route Handlers.
 * Replace 'any' with a default type that extends an object or is undefined.
 */
export interface ApiHandler<T = unknown> { // Changed any to unknown
    (req: NextApiRequest, res: NextApiResponse<ApiResponse<T>>): Promise<void> | void;
}
