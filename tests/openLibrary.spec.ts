import { test } from '@playwright/test';
import testData from '../testData/books.json';
import importBookData from '../testData/import-book.json';
import putBookData from '../testData/put-book.json';
import deleteData from '../testData/authorDelete.json';
import dotenv from 'dotenv';

// Load username and password from .env file
dotenv.config();

import { OpenLibraryApi } from '../api/openLibraryApi';
import { ApiAssertions } from '../utils/apiAssertions';


// ==================================================
// TestCase 1: GET - Search Books
// ==================================================

test('GET - Search books', async ({ request }) => {

    // Create API service instance
    const api = new OpenLibraryApi(request);

    // Get search data from test data file
    const {
        searchQuery,
        expectedKeyword
    } = testData[0];

    // Send GET request to search books
    const response = await api.searchBooks(searchQuery);

    // Validate response status code
    ApiAssertions.validateStatus(
        response.status(),
        200
    );

    // Convert API response to JSON
    const responseBody = await response.json();

    // Validate num_found property exists
    ApiAssertions.validateProperty(
        responseBody,
        'num_found'
    );

    // Validate numFound value
    //expect(responseBody.num_found).toBeGreaterThan(0);

    // Validate docs property
    ApiAssertions.validateProperty(
        responseBody,
        'docs'
    );

    // Validate docs is an array
    ApiAssertions.validateArray(
        responseBody.docs
    );

    // Validate docs array is not empty
    ApiAssertions.validateArrayNotEmpty(
        responseBody.docs
    );

    // Validate expected book title exists
    ApiAssertions.validateBookTitle(
        responseBody.docs,
        expectedKeyword
    );
});


// ==================================================
// TestCase 2: POST - Import Book
// ==================================================

test(
    'POST - Import book ',
    async ({ request }) => {

        // Create API service instance
        const api = new OpenLibraryApi(request);

        // ------------------------------------------
        // Login
        // ------------------------------------------

        // Get Open Library access key
        const access =
            process.env.OPENLIBRARY_ACCESS;

        // Get Open Library secret key
        const secret =
            process.env.OPENLIBRARY_SECRET;

        // Validate credentials are available
        if (!access || !secret) {
            throw new Error(
                'Open Library credentials are missing in .env'
            );
        }

        // Send login request
        const loginResponse = await api.login();

        // Validate login response status
        ApiAssertions.validateStatus(
            loginResponse.status(),
            200
        );

        // ------------------------------------------
        // Import book
        // ------------------------------------------

        // Send import book request
        const response =
            await api.importBook(importBookData);

        // Log import response status
        console.log(
            'Import Status:',
            response.status()
        );

        // Log import response body
        console.log(
            'Import Response:',
            await response.text()
        );

        // Expected because account does not have
        // import permission
        ApiAssertions.validateStatus(
            response.status(),
            403
        );
    }
);


// ==================================================
// TestCase 3: PUT - Update Work
// ==================================================

test(
    'PUT - Update work ',
    async ({ request }) => {

        // Create API service instance
        const api = new OpenLibraryApi(request);

        // Send PUT request to update work
        const response = await api.updateWork(
            'OL15626917W',
            putBookData
        );

        // Log PUT response status
        console.log(
            'PUT Status:',
            response.status()
        );

        // Log PUT response body
        console.log(
            'PUT Response:',
            await response.text()
        );

        // Validate expected restricted operation status
        ApiAssertions.validateStatus(
            response.status(),
            403
        );
    }
);


// ==================================================
// TestCase 4: PATCH - Update Work
// ==================================================

test(
    'PATCH - Update Work',
    async ({ request }) => {

        // Create API service instance
        const api = new OpenLibraryApi(request);

        // Send PATCH request to update work
        const response = await api.patchWork(
            'OL45804W',
            {
                author: 'J.R.R. Tolkien'
            }
        );

        // Log PATCH response status
        console.log(
            'PATCH Status:',
            response.status()
        );

        // Log PATCH response body
        console.log(
            'PATCH Response:',
            await response.text()
        );

        // Validate expected restricted operation status
        ApiAssertions.validateStatus(
            response.status(),
            403
        );
    }
);


// ==================================================
// TestCase 5: DELETE - Delete Author
// ==================================================

test(
    'DELETE - Delete author ',
    async ({ request }) => {

        // Create API service instance
        const api = new OpenLibraryApi(request);

        // Define author ID to delete
        const authorId = 'OL23919A';

        // Send DELETE request for the author
        const response = await api.deleteAuthor(
            authorId,
            deleteData
        );

        // Log DELETE response status
        console.log(
            'DELETE Status:',
            response.status()
        );

        // Log DELETE response body
        console.log(
            'DELETE Response:',
            await response.text()
        );

        // Validate expected restricted operation status
        ApiAssertions.validateStatus(
            response.status(),
            403
        );
    }
);