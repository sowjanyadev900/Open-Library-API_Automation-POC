import dotenv from 'dotenv';
// Load environment variables from the .env file
dotenv.config();

// Store all API configuration in one place
export const API_CONFIG = {
    
    // Base URL for Open Library APIs
    baseURL: 'https://openlibrary.org',

     // Define all API endpoints
    endpoints: {
        search: '/search.json',
        login: '/account/login.json',
        importBook: '/api/import',

        // Generate the work endpoint using the work ID
        work: (workId: string) =>
            `/works/${workId}.json`,

        // Generate the author endpoint using the author ID
        author: (authorId: string) =>
            `/authors/${authorId}.json`
    },

    // Store Open Library authentication credentials
    credentials: {
        access: process.env.OPENLIBRARY_ACCESS,
        secret: process.env.OPENLIBRARY_SECRET
    },

    // Define common API request headers
    headers: {
        contentType: 'application/json',
        accept: 'application/json',
        userAgent: 'Playwright-API-POC'
    }
};