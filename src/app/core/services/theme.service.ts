import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(this.getInitialTheme());
  private theme$: Observable<Theme> = this.themeSubject.asObservable();
  public isDarkMode$: Observable<boolean> = this.theme$.pipe(
    map((theme: Theme): boolean => theme === 'dark'),
  );

  constructor() {
    // Apply the initial theme
    this.applyTheme(this.themeSubject.value);
  }

  public toggleTheme(): void {
    const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  public setTheme(theme: Theme): void {
    localStorage.setItem('theme', theme);
    this.themeSubject.next(theme);
    this.applyTheme(theme);
  }

  private getInitialTheme(): Theme {
    // Check localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }

    // Check for system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    // Default to light
    return 'light';
  }

  private applyTheme(theme: Theme): void {
    // Remove existing theme classes
    document.documentElement.classList.remove('light-theme', 'dark-theme');

    // Add the new theme class
    document.documentElement.classList.add(`${theme}-theme`);

    // Set data-theme attribute for Tailwind
    document.documentElement.setAttribute('data-theme', theme);

    // Set PrimeNG theme (if using dynamic theme switching)
    this.updatePrimeNGTheme(theme);
  }

  private updatePrimeNGTheme(theme: Theme): void {
    // Update PrimeNG theme link if needed
    // For example, if you have different CSS files for light/dark themes
    const themeLink = document.getElementById('app-theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `${theme === 'dark' ? 'lara-dark' : 'lara-light'}-indigo/theme.css`;
    }
  }
}
