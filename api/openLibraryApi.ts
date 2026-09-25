import { API_CONFIG } from '../config/apiconfig';
import {
    APIRequestContext,
    APIResponse
} from '@playwright/test';


// Open Library API service for handling API requests
export class OpenLibraryApi {

    // Initialize the API request context
    constructor(private request: APIRequestContext) {}

    // GET - Search books using the provided search query
    async searchBooks(searchQuery: string): Promise<APIResponse> {

        // Send GET request with search query parameter
        return await this.request.get(
            API_CONFIG.endpoints.search,
            {
                params: {
                    q: searchQuery
                }
            }
        );
    }

    // POST - Authenticate with Open Library credentials
    async login(): Promise<APIResponse> {

        // Send login request with authentication credentials
        return await this.request.post(
            API_CONFIG.endpoints.login,
            {
                headers: {
                    'Content-Type': API_CONFIG.headers.contentType,
                    'Accept': API_CONFIG.headers.accept
                },
                data: {
                    access: API_CONFIG.credentials.access,
                    secret: API_CONFIG.credentials.secret
                }
            }
        );
    }

    // POST - Import a book using the provided book data
    async importBook(bookData: object): Promise<APIResponse> {

        // Send book import request with required headers and data
        return await this.request.post(
            API_CONFIG.endpoints.importBook,
            {
                headers: {
                    'Content-Type': API_CONFIG.headers.contentType,
                    'Accept': API_CONFIG.headers.accept,
                    'User-Agent': API_CONFIG.headers.userAgent
                },
                data: bookData
            }
        );
    }

    // PUT - Update an existing work using the work ID and book data
    async updateWork(
        workId: string,
        bookData: object
    ): Promise<APIResponse> {

        // Send PUT request to update the specified work
        return await this.request.put(
            API_CONFIG.endpoints.work(workId),
            {
                headers: {
                    'Content-Type': API_CONFIG.headers.contentType,
                    'Accept': API_CONFIG.headers.accept,
                    'User-Agent': API_CONFIG.headers.userAgent
                },
                data: bookData
            }
        );
    }

    // PATCH - Partially update an existing work using the work ID
    async patchWork(
        workId: string,
        data: object
    ): Promise<APIResponse> {

        // Send PATCH request with the provided update data
        return await this.request.patch(
            API_CONFIG.endpoints.work(workId),
            {
                headers: {
                    'Content-Type': API_CONFIG.headers.contentType,
                    'Accept': API_CONFIG.headers.accept,
                    'User-Agent': API_CONFIG.headers.userAgent
                },
                data
            }
        );
    }

    // DELETE - Delete an author using the author ID
    async deleteAuthor(
        authorId: string,
        deleteData?: object
    ): Promise<APIResponse> {

        // Send DELETE request with optional request body
        return await this.request.delete(
            API_CONFIG.endpoints.author(authorId),
            {
                headers: {
                    'Content-Type': API_CONFIG.headers.contentType,
                    'Accept': API_CONFIG.headers.accept,
                    'User-Agent': API_CONFIG.headers.userAgent
                },
                data: deleteData
            }
        );
    }
}