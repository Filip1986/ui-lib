import {applicationConfig, Preview} from '@storybook/angular'
import { setCompodocJson } from "@storybook/addon-docs/angular";
import { moduleMetadata } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import docJson from "../documentation.json";
import {PrimeNG} from 'primeng/config';
import Lara from '@primeng/themes/lara';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient} from '@angular/common/http';
import {APP_BOOTSTRAP_LISTENER} from '@angular/core';
setCompodocJson(docJson);


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
    moduleMetadata({
      imports: [FormsModule, ReactiveFormsModule],
    }),
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
  parameters: {
    viewport: {
      defaultViewport: 'responsive', // Set the default viewport
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
