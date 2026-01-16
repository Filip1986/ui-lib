import type { Meta, StoryObj } from '@storybook/angular';
import { Button1Component } from './button-1.component';

const meta: Meta<Button1Component> = {
  component: Button1Component,
  title: 'Components/Button',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'blue',
        'red',
        'green',
        'yellow',
        'primary',
        'secondary',
        'flat',
        'outline',
      ],
      description: 'Button variant/color',
      defaultValue: 'blue',
    },
    animate: {
      control: 'boolean',
      description: 'Enable button animation effect',
      defaultValue: true,
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
      defaultValue: 'medium',
    },
    rounded: {
      control: 'boolean',
      description: 'Enable rounded corners',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
      defaultValue: false,
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Button type attribute',
      defaultValue: 'button',
    },
    icon: {
      control: 'text',
      description: 'PrimeNG icon name (without pi- prefix)',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right', 'none'],
      description: 'Position of the icon',
      defaultValue: 'none',
    },
    clickEvent: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<Button1Component>;

// Basic Button Story
export const Basic: Story = {
  args: {
    variant: 'blue',
    animate: true,
    size: 'medium',
    rounded: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<lib-button-1
      [variant]="variant"
      [animate]="animate"
      [size]="size"
      [rounded]="rounded"
      [disabled]="disabled"
      (onClick)="onClick($event)">
        Button
    </lib-button-1>`,
  }),
};

// Color Variants Story
export const ColorVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 10px;">
        <lib-button-1 variant="blue">Blue</lib-button-1>
        <lib-button-1 variant="red">Red</lib-button-1>
        <lib-button-1 variant="green">Green</lib-button-1>
        <lib-button-1 variant="yellow">Yellow</lib-button-1>
        <lib-button-1 variant="primary">Primary</lib-button-1>
        <lib-button-1 variant="secondary">Secondary</lib-button-1>
      </div>
    `,
  }),
};

// Size Variants Story
export const SizeVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
        <lib-button-1 size="small" variant="blue">Small</lib-button-1>
        <lib-button-1 size="medium" variant="blue">Medium</lib-button-1>
        <lib-button-1 size="large" variant="blue">Large</lib-button-1>
      </div>
    `,
  }),
};

// Flat Style Buttons
export const FlatButtons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 10px;">
        <lib-button-1 variant="flat" class="variant-flat-blue">Flat Blue</lib-button-1>
        <lib-button-1 variant="flat" class="variant-flat-red">Flat Red</lib-button-1>
        <lib-button-1 variant="flat" class="variant-flat-green">Flat Green</lib-button-1>
        <lib-button-1 variant="flat" class="variant-flat-yellow">Flat Yellow</lib-button-1>
      </div>
    `,
  }),
};

// Outline Style Buttons
export const OutlineButtons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 10px;">
        <lib-button-1 variant="outline" class="variant-outline-blue">Outline Blue</lib-button-1>
        <lib-button-1 variant="outline" class="variant-outline-red">Outline Red</lib-button-1>
        <lib-button-1 variant="outline" class="variant-outline-green">Outline Green</lib-button-1>
        <lib-button-1 variant="outline" class="variant-outline-yellow">Outline Yellow</lib-button-1>
      </div>
    `,
  }),
};

// Rounded Buttons
export const RoundedButtons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 10px;">
        <lib-button-1 variant="blue" [rounded]="true">Rounded</lib-button-1>
        <lib-button-1 variant="red" [rounded]="true">Rounded</lib-button-1>
        <lib-button-1 variant="green" [rounded]="true">Rounded</lib-button-1>
        <lib-button-1 variant="yellow" [rounded]="true">Rounded</lib-button-1>
      </div>
    `,
  }),
};

// Buttons with Icons
export const ButtonsWithIcons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 10px;">
        <lib-button-1 variant="blue" icon="pi-check" iconPosition="left">Check</lib-button-1>
        <lib-button-1 variant="green" icon="pi-plus" iconPosition="left">Add</lib-button-1>
        <lib-button-1 variant="red" icon="pi-trash" iconPosition="left">Delete</lib-button-1>
        <lib-button-1 variant="primary" icon="pi-arrow-right" iconPosition="right">Next</lib-button-1>
      </div>
    `,
  }),
};

// Disabled Buttons
export const DisabledButtons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 10px;">
        <lib-button-1 variant="blue" [disabled]="true">Disabled</lib-button-1>
        <lib-button-1 variant="red" [disabled]="true">Disabled</lib-button-1>
        <lib-button-1 variant="green" [disabled]="true">Disabled</lib-button-1>
        <lib-button-1 variant="outline" class="variant-outline-blue" [disabled]="true">Disabled</lib-button-1>
      </div>
    `,
  }),
};
