import { Injectable } from '@angular/core';
import { User } from '../models/user';



@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {

    private readonly USER_STORAGE_KEY = 'login';

    /* ============================================================
     * Public API
     * ============================================================
     */

    /**
     * Stores the logged-in user in Local Storage.
     *
     * @param user - User object to be saved
     */
    setUserOnLocalStorage(user: User): void {
        this.setToLocalStorage<User>(this.USER_STORAGE_KEY, user);
    }

    /**
     * Retrieves the logged-in user from Local Storage.
     *
     * @returns User object or null if not found
     */
    getUserFromLocalStorage(): User | null {
        return this.getFromLocalStorage<User>(this.USER_STORAGE_KEY);
    }

    /**
     * Removes the logged-in user from Local Storage.
     */
    clearUserFromLocalStorage(): void {
        this.removeFromLocalStorage(this.USER_STORAGE_KEY);
    }

    /* ============================================================
     * Private Helpers
     * ============================================================
     */


    /**
     * 
     * 
     * 
     * 
     */
    private isBrowser(): boolean {
        return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    }



    /**
     * Saves any serializable value into Local Storage.
     * The value is JSON-stringified and Base64-encoded
     * to ensure Unicode safety.
     *
     * @param key - Local Storage key
     * @param value - Any JSON-serializable value
     */
    private setToLocalStorage<T>(key: string, value: T): void {
        if (!this.isBrowser()) return;  // ✅ evita erro no Node
        const jsonString = JSON.stringify(value);
        const encodedValue = this.encodeBase64(jsonString);
        localStorage.setItem(key, encodedValue);
    }

    /**
     * Retrieves and parses a value from Local Storage.
     * Automatically decodes Base64 and parses JSON.
     *
     * @param key - Local Storage key
     * @returns Parsed value or null if not found or invalid
     */
    private getFromLocalStorage<T>(key: string): T | null {
        if (!this.isBrowser()) return null;  // ✅ evita erro no Node
        const storedValue = localStorage.getItem(key);
        if (!storedValue) return null;
        try {
            const decodedValue = this.decodeBase64(storedValue);
            return JSON.parse(decodedValue) as T;
        } catch {
            return null;
        }
    }

    /**
     * Removes a value from Local Storage.
     *
     * @param key - Local Storage key
     */
    private removeFromLocalStorage(key: string): void {
        if (!this.isBrowser()) return;  // ✅ evita erro no Node
        localStorage.removeItem(key);
    }

    /**
     * Encodes a string to Base64 in a Unicode-safe way.
     *
     * @param value - String to encode
     * @returns Base64 encoded string
     */
    private encodeBase64(value: string): string {
        const bytes = new TextEncoder().encode(value);
        return btoa(String.fromCharCode(...bytes));
    }

    /**
     * Decodes a Base64 string into a Unicode-safe string.
     *
     * @param base64 - Base64 encoded string
     * @returns Decoded string
     */
    private decodeBase64(base64: string): string {
        const binary = atob(base64);
        const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
        return new TextDecoder().decode(bytes);
    }
}
