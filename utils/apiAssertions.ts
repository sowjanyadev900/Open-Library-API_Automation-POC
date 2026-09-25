import { expect } from '@playwright/test';

// Reusable API validation methods
export class ApiAssertions {

    // Validate the API response status code

    static validateStatus(
        actualStatus: number,
        expectedStatus: number
    ): void {

        expect(actualStatus).toBe(expectedStatus);
    }

    // Validate that a property exists in the response body

    static validateProperty(
        responseBody: object,
        propertyName: string
    ): void {

        expect(responseBody).toHaveProperty(propertyName);
    }

    // Validate that the response value is an array

    static validateArray(value: unknown): void {

        expect(Array.isArray(value)).toBeTruthy();
    }

    // Validate that the array contains at least one item

    static validateArrayNotEmpty(value: unknown[]): void {

        expect(value.length).toBeGreaterThan(0);
    }

    // Validate that a book title contains the expected keyword

    static validateBookTitle(
        books: any[],
        expectedKeyword: string
    ): void {

        // Check if any book title matches the expected keyword
        const matchingBook = books.some(
            book =>
                (book.title ?? '')
                    .toLowerCase()
                    .includes(expectedKeyword.toLowerCase())
        );

        // Validate that a matching book was found
        expect(matchingBook).toBeTruthy();
    }
}