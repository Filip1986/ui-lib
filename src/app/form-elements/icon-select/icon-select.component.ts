import { Component, Input, Output, EventEmitter, forwardRef, OnInit } from '@angular/core';

import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { PRIME_ICONS } from './prime-icons';
import {
  FormComponentSizeEnum,
  FormComponentVariantEnum,
  FormLabelPositionEnum,
  FormLabelStyleEnum,
} from '../common/form-element-common';
import { LibSelectComponent } from '../select/lib-select.component';
import { DEFAULT_SCROLL_HEIGHT } from '../select';
// Interface for icon items
export interface IconItem {
  class: string;
  name: string;
  category?: string;
}

// Interface for grouped icons
export interface IconGroup {
  label: string; // Category name
  value: string; // Category key/id
  items: IconItem[]; // Icons in this category
}

/**
 * A reusable icon select component that displays icons with a visual preview.
 * This component works with Angular forms via ControlValueAccessor.
 */
@Component({
  selector: 'lib-icon-select',
  standalone: true,
  imports: [ReactiveFormsModule, LibSelectComponent],
  templateUrl: './icon-select.component.html',
  styleUrls: ['./icon-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IconSelectComponent),
      multi: true,
    },
  ],
})
export class IconSelectComponent implements ControlValueAccessor, OnInit {
  @Input() label = 'Icon';
  @Input() placeholder = 'Select an icon';
  @Input() disabled = false;
  @Input() required = false;
  @Input() helperText = '';
  @Input() errorMessage = '';
  @Input() size = FormComponentSizeEnum.NORMAL;
  @Input() variant = FormComponentVariantEnum.OUTLINED;
  @Input() labelStyle = FormLabelStyleEnum.DEFAULT;
  @Input() labelPosition = FormLabelPositionEnum.ABOVE;
  @Input() formControlName = '';
  @Input() showClear = true;
  @Input() filter = true;
  @Input() scrollHeight = DEFAULT_SCROLL_HEIGHT;

  // Input to enable/disable category grouping
  @Input() groupByCategory = false;

  // Input to provide a custom list of icons
  @Input() iconsList: IconItem[] = [];

  @Output() iconSelected = new EventEmitter<string | null>();

  // Icons list - default to PRIME_ICONS but can be overridden
  icons: IconItem[] | IconGroup[] = [];

  // Form control for the icon select
  iconControl = new FormControl('');

  // Display constants for template use
  readonly FormComponentSizeEnum = FormComponentSizeEnum;
  readonly FormComponentVariantEnum = FormComponentVariantEnum;
  readonly FormLabelStyleEnum = FormLabelStyleEnum;
  readonly FormLabelPositionEnum = FormLabelPositionEnum;

  constructor() {
    // Subscribe to value changes to emit events and call onChange
    this.iconControl.valueChanges.subscribe((value) => {
      this.onChange(value);
      this.iconSelected.emit(value);
    });
  }

  ngOnInit(): void {
    // Use custom icons list if provided, otherwise use default PRIME_ICONS
    const sourceIcons = this.iconsList.length > 0 ? this.iconsList : PRIME_ICONS;

    if (this.groupByCategory) {
      // Group icons by category
      this.organizeIconsByCategory(sourceIcons);
    } else {
      // Use flat list
      this.icons = sourceIcons;
    }
  }

  /**
   * Write value to the control - called when the form sets a value on this control
   */
  writeValue(value: string): void {
    if (value !== undefined && value !== null) {
      this.iconControl.setValue(value, { emitEvent: false });
    }
  }

  /**
   * Register a callback function to be triggered on value change
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Register a callback function to be triggered on touched
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Enable/disable the control
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (this.disabled) {
      this.iconControl.disable();
    } else {
      this.iconControl.enable();
    }
  }

  /**
   * Find the icon object for a given class string
   */
  getIconObjectByClass(iconClass: string): any {
    if (!iconClass) return null;

    // If using groups, we need to search through all groups
    if (this.groupByCategory) {
      const groups = this.icons as IconGroup[];
      for (const group of groups) {
        const foundIcon = group.items.find((icon) => icon.class === iconClass);
        if (foundIcon) return foundIcon;
      }
      return { class: iconClass, name: iconClass };
    }

    // If using flat list
    return (
      (this.icons as IconItem[]).find((icon) => icon.class === iconClass) || {
        class: iconClass,
        name: iconClass,
      }
    );
  }

  /**
   * Called when the control is touched
   */
  onBlur(): void {
    this.onTouched();
  }

  // ControlValueAccessor implementation
  private onChange: any = () => {};

  private onTouched: any = () => {};

  /**
   * Organizes the flat icons list into a grouped structure by category
   */
  private organizeIconsByCategory(icons: IconItem[]): void {
    // Create a map to store icons by category
    const categoriesMap = new Map<string, IconItem[]>();

    // Group icons by their category
    icons.forEach((icon) => {
      const category = icon.category || 'Other'; // Default to 'Other' if no category

      if (!categoriesMap.has(category)) {
        categoriesMap.set(category, []);
      }

      categoriesMap.get(category)?.push(icon);
    });

    // Convert map to array of IconGroup objects
    const groupedIcons: IconGroup[] = [];

    // Sort categories alphabetically
    Array.from(categoriesMap.keys())
      .sort()
      .forEach((category) => {
        groupedIcons.push({
          label: category,
          value: category.toLowerCase().replace(/\s+/g, '-'), // Create a value from the category name
          items: categoriesMap.get(category) || [],
        });
      });

    this.icons = groupedIcons;
  }
}
