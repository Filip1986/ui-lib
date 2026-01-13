# Animated Button Component

A highly customizable animated button component with various styles, positions, and animations.

## Features

- Icon positioning (left/right)
- Multiple style variants (default, arrow, gear, slant)
- Color options (default, blue, red, green)
- Size variations (small, medium, large)
- Support for anchor tag with href
- Animation effects on hover
- Disabled state

## Usage

```html
<!-- Basic usage -->
<lib-button-animated icon="heart" position="left">
  Button Text
</lib-button-animated>

<!-- With all options -->
<lib-button-animated
  icon="heart"
  position="left"
  variant="arrow"
  color="blue"
  size="medium"
  [disabled]="false"
  (clickEvent)="handleClick($event)">
  Button Text
</lib-button-animated>

<!-- As a link -->
<lib-button-animated
  icon="link"
  href="https://example.com"
  (clickEvent)="handleClick($event)">
  Link Button
</lib-button-animated>
```

## Input Properties

| Name       | Type                                  | Default    | Description                         |
|------------|---------------------------------------|------------|-------------------------------------|
| icon       | string                                | ''         | PrimeNG icon name (without pi- prefix) |
| position   | 'left' \| 'right'                     | 'left'     | Icon position                       |
| variant    | 'default' \| 'arrow' \| 'gear' \| 'slant' | 'default' | Button style variant             |
| color      | 'default' \| 'blue' \| 'red' \| 'green' | 'default' | Button color                      |
| size       | 'small' \| 'medium' \| 'large'        | 'medium'   | Button size                         |
| disabled   | boolean                               | false      | Whether the button is disabled      |
| type       | 'button' \| 'submit' \| 'reset'       | 'button'   | Button type (for non-anchor buttons) |
| href       | string                                | undefined  | URL for anchor tag                  |

## Output Events

| Name       | Description                             |
|------------|-----------------------------------------|
| clickEvent | Emitted when the button is clicked      |

## Style Variants

### Default
Basic button with a colored icon section and a title section.

### Arrow
Adds arrow shapes between the icon and title sections.

### Gear
Similar to default but with different styling.

### Slant
Adds slanted shapes between the icon and title sections.

## Example

```typescript
import { Component } from '@angular/core';
import { ButtonAnimatedComponent } from '@artificial-sense/ui-lib';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ButtonAnimatedComponent],
  template: `
    <lib-button-animated
      icon="heart"
      position="left"
      variant="arrow"
      (clickEvent)="handleClick($event)">
      Favorite This!
    </lib-button-animated>
  `
})
export class ExampleComponent {
  handleClick(event: Event): void {
    console.log('Button clicked!', event);
  }
}
```
