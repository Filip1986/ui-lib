// libs/ui-lib/src/lib/breadcrumbs/breadcrumbs.component.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { BreadcrumbsComponent } from './breadcrumbs.component';

const meta: Meta<BreadcrumbsComponent> = {
  component: BreadcrumbsComponent,
  title: 'Components/Breadcrumbs',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'styled', 'minimal'],
      description: 'The visual style of the breadcrumbs',
      defaultValue: 'standard',
    },
    separator: {
      control: 'text',
      description: 'Custom separator for standard and minimal variants',
    },
    items: {
      control: 'object',
      description: 'Array of breadcrumb items',
    },
    homePage: {
      control: 'object',
      description: 'Home page item to prepend to the items',
    },
  },
};

export default meta;
type Story = StoryObj<BreadcrumbsComponent>;

// Standard Breadcrumbs Story
export const Standard: Story = {
  args: {
    variant: 'standard',
    separator: '/',
    items: [
      { label: 'Home', url: '/' },
      { label: 'Products', url: '/products' },
      { label: 'Electronics', url: '/products/electronics' },
      { label: 'Smartphones', url: '/products/electronics/smartphones' },
      { label: 'Product Detail' },
    ],
  },
};

// Styled Breadcrumbs with Icons Story
export const StyledWithIcons: Story = {
  args: {
    variant: 'styled',
    items: [
      { label: 'Home', url: '/', icon: 'pi-home' },
      { label: 'Products', url: '/products', icon: 'pi-shopping-bag' },
      {
        label: 'Electronics',
        url: '/products/electronics',
        icon: 'pi-desktop',
      },
      {
        label: 'Smartphones',
        url: '/products/electronics/smartphones',
        icon: 'pi-mobile',
      },
      { label: 'Product Detail', icon: 'pi-info-circle' },
    ],
  },
};

// Minimal Breadcrumbs Story
export const Minimal: Story = {
  args: {
    variant: 'minimal',
    separator: '›',
    items: [
      { label: 'Home', url: '/' },
      { label: 'Products', url: '/products' },
      { label: 'Electronics', url: '/products/electronics' },
      { label: 'Product Detail' },
    ],
  },
};

// With Home Page Story
export const WithHomePage: Story = {
  args: {
    variant: 'standard',
    separator: '/',
    homePage: { label: 'Dashboard', url: '/dashboard', icon: 'pi-th-large' },
    items: [
      { label: 'User Management', url: '/users' },
      { label: 'User Profile', url: '/users/profile' },
      { label: 'Settings' },
    ],
  },
};

// Short Path Story
export const ShortPath: Story = {
  args: {
    variant: 'minimal',
    separator: '›',
    items: [{ label: 'Home', url: '/' }, { label: 'Current Page' }],
  },
};
