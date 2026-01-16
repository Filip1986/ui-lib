
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { NotFoundFeatures } from '../models/not-found-contract';

/**
 * Base component for NotFound variants that provides common functionality
 * and shared behavior. Variant components should extend this base class.
 *
 * @internal This component is meant to be extended, not used directly
 */
@Component({
  selector: 'lib-base-not-found',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: '', // Base component doesn't need a template
})
export class BaseNotFoundComponent implements OnInit, OnDestroy {
  /** The title displayed on the 404 page */
  @Input() title = '404 - Page Not Found';

  /** The descriptive message displayed on the 404 page */
  @Input() message = 'The page you are looking for does not exist or has been moved.';

  /** Search form group for the search box feature */
  searchForm!: FormGroup;

  /** Flag indicating if the form is being submitted */
  isSearching = false;

  /** Features configuration for enabling/disabling component functionality */
  @Input() features: NotFoundFeatures = {
    showHomeLink: true,
    showBackButton: true,
    showSearchBox: false,
  };

  /** Emitted when the user clicks the "Go Home" button */
  @Output() goHome: EventEmitter<void> = new EventEmitter<void>();

  /** Emitted when the user clicks the "Go Back" button */
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();

  /** Emitted when the user performs a search */
  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();

  /** Subject for handling component destruction and cleaning up subscriptions */
  private destroy$: Subject<void> = new Subject<void>();

  constructor(protected fb: FormBuilder) {
    this.initializeForm();
  }

  /**
   * Convenience getter for the search query form control
   */
  get searchQuery(): AbstractControl | null {
    return this.searchForm.get('searchQuery');
  }

  /**
   * Initialize component
   */
  ngOnInit(): void {
    // Set up form value changes listener with debounce
    if (this.features.showSearchBox) {
      this.setupFormValueChanges();
    }
  }

  /**
   * Clean up subscriptions when component is destroyed
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Navigate back to previous page
   * @param event - Optional mouse event
   */
  onGoBack(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.goBack.emit();
  }

  /**
   * Navigate to home page
   * @param event - Optional mouse event
   */
  onGoHome(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.goHome.emit();
  }

  /**
   * Handle search form submission
   * @param event - Optional form submit event
   */
  onSearch(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    if (this.searchForm.invalid) {
      this.markFormGroupTouched(this.searchForm);
      return;
    }

    const query = this.searchForm.value.searchQuery?.trim();
    if (query) {
      this.isSearching = true;
      this.searchEvent.emit(query);

      // Reset search state after a short delay
      setTimeout(() => {
        this.isSearching = false;
      }, 1000);
    }
  }

  /**
   * Creates the search form with validation
   * @private
   */
  private initializeForm(): void {
    this.searchForm = this.fb.group({
      searchQuery: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    });
  }

  /**
   * Sets up a listener for form value changes with debounce
   * @private
   */
  private setupFormValueChanges(): void {
    // Optional: Add live search as user types with debounce
    this.searchForm
      .get('searchQuery')
      ?.valueChanges.pipe(
        debounceTime(300), // Wait 300ms after the last event before emitting
        takeUntil(this.destroy$),
      )
      .subscribe((value) => {
        console.debug('Search query changed:', value);
      });
  }

  /**
   * Mark all controls in the form group as touched to trigger validation
   * @param formGroup - The form group to mark as touched
   * @private
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
