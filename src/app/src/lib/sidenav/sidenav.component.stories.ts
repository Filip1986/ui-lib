import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { SidenavComponent } from './sidenav.component';
import { provideRouter } from '@angular/router';
import { fn } from '@storybook/test';

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


// Meta data for the component
const meta: Meta<SidenavComponent> = {
  title: 'UI Components/Sidenav',
  component: SidenavComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideRouter([]),
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
    itemClick: fn(),
    expandChange: fn(),
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
    variant: {
      control: 'select',
      options: ['1', '2', '3'],
      description: 'Sidenav variant/style',
    },
    isBetaTester: {
      control: 'boolean',
      description: 'Whether the user is a beta tester',
    },
    expanded: {
      control: 'boolean',
      description: 'Whether the sidenav is expanded or collapsed',
    },
    items: {
      control: 'object',
      description: 'Navigation items to display',
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

// With Beta Tester Badge story
export const WithBetaTester: Story = {
  args: {
    isBetaTester: true,
  },
};

// Variant 2 story
export const Variant2: Story = {
  args: {
    variant: '2',
  },
};

// Variant 3 story
export const Variant3: Story = {
  args: {
    variant: '3',
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
