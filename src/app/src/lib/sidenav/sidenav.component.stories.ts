import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SidenavComponent } from './sidenav.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { action } from '@storybook/addon-actions';

// Define navigation items for our stories
const mockNavigationItems = [
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    route: '/dashboard',
  },
  {
    label: 'Analytics',
    icon: 'pi pi-chart-bar',
    expanded: true,
    children: [
      { label: 'Reports', icon: 'pi pi-file', route: '/analytics/reports' },
      {
        label: 'Statistics',
        icon: 'pi pi-chart-line',
        route: '/analytics/statistics',
      },
      {
        label: 'Performance',
        icon: 'pi pi-bolt',
        route: '/analytics/performance',
      },
    ],
  },
  {
    label: 'User Management',
    icon: 'pi pi-users',
    children: [
      { label: 'List Users', icon: 'pi pi-list', route: '/users/list' },
      { label: 'Add User', icon: 'pi pi-user-plus', route: '/users/add' },
      { label: 'User Groups', icon: 'pi pi-sitemap', route: '/users/groups' },
    ],
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    route: '/settings',
  },
  {
    label: 'Disabled Option',
    icon: 'pi pi-lock',
    disabled: true,
  },
];

// Sample footer template
const footerTemplate = `
<div class="flex items-center justify-between">
  <div class="flex items-center">
    <div class="w-8 h-8 rounded-full bg-blue-500 mr-2"></div>
    <div>
      <div class="text-sm font-medium">John Doe</div>
      <div class="text-xs opacity-75">Administrator</div>
    </div>
  </div>
  <button class="text-white hover:text-blue-200">
    <i class="pi pi-sign-out"></i>
  </button>
</div>
`;

// Meta data for the component
const meta: Meta<SidenavComponent> = {
  title: 'UI Components/Sidenav',
  component: SidenavComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        RouterModule.forRoot([], { useHash: true }),
        ButtonModule,
      ],
    }),
  ],
  parameters: {
    // Optional parameters
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1e1e1e' },
        { name: 'light', value: '#f5f5f5' },
      ],
    },
  },
  // Arguments that all stories will inherit
  args: {
    items: mockNavigationItems,
    title: 'Navigation',
    expanded: true,
    // Event handlers
    itemClick: action('itemClick'),
    expandChange: action('expandChange'),
  },
  // Controls for the component props
  argTypes: {
    title: {
      control: 'text',
      description: 'Title displayed at the top of the sidenav',
    },
    logo: {
      control: 'text',
      description: 'URL for the logo image',
    },
    expanded: {
      control: 'boolean',
      description: 'Whether the sidenav is expanded or collapsed',
    },
    items: {
      control: 'object',
      description: 'Navigation items to display',
    },
    footerTemplate: {
      control: { type: 'select' },
      options: ['none', 'withFooter'],
      mapping: {
        none: undefined,
        withFooter: footerTemplate,
      },
      description: 'Optional footer template',
    },
  },
};

export default meta;
type Story = StoryObj<SidenavComponent>;

// Default story
export const Default: Story = {
  args: {
    // Default arguments are inherited from meta
  },
};

// Expanded state story
export const Expanded: Story = {
  args: {
    expanded: true,
  },
};

// Collapsed state story
export const Collapsed: Story = {
  args: {
    expanded: false,
  },
};

// With Logo story
export const WithLogo: Story = {
  args: {
    logo: 'https://place-hold.it/32x32',
  },
};

// With Footer story
export const WithFooter: Story = {
  args: {
    footerTemplate: 'withFooter',
  },
};

// Dark theme story
export const DarkTheme: Story = {
  args: {
    // Same as default but with a dark background parameter
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Light theme story (would require CSS changes in the component)
export const LightTheme: Story = {
  args: {
    // Example for a light theme version
    // This would require modifying the component to accept a theme prop
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
};

// Mobile view story
export const MobileView: Story = {
  args: {
    expanded: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
