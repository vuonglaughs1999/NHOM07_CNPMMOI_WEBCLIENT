import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    const now = new Date()

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: token,
      expiry: now.getTime() + 180000,
    }
    window.localStorage.setItem(TOKEN_KEY, JSON.stringify(item));
  }

  public getToken(): string|null {
    const tokenItem = localStorage.getItem(TOKEN_KEY);
    if (!tokenItem) {
      return null;
    }
    const token = JSON.parse(tokenItem);
    // check expiry time
    const now = new Date();
    if (now.getTime() > token.expiry) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
    return token.value;
  }
}
