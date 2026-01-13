import { APP_BOOTSTRAP_LISTENER } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Preview } from '@storybook/angular';
import { PrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import 'zone.js';
import { provideHttpClient } from '@angular/common/http';

function provideTheme(config: PrimeNG): () => void {
  return (): void => {
    config.theme.set({
      preset: Lara,
      options: {
        darkModeSelector: false,
      },
    });
  };
}

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        provideHttpClient(),
        {
          provide: APP_BOOTSTRAP_LISTENER,
          useFactory: provideTheme,
          deps: [PrimeNG],
          multi: true,
        },
      ],
    }),
  ],
};

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS, // Use the default viewports
    defaultViewport: 'responsive', // Set the default viewport
  },
};

export default preview;
