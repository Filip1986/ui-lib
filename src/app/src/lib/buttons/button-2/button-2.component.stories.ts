import type { Meta, StoryObj } from '@storybook/angular';
import { Button2Component } from './button-2.component';

const meta: Meta<Button2Component> = {
  component: Button2Component,
  title: 'Components/Animated Button',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      control: 'text',
      description: 'PrimeNG icon name without the pi- prefix',
      defaultValue: 'heart',
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the icon',
      defaultValue: 'left',
    },
    variant: {
      control: 'select',
      options: ['default', 'arrow', 'gear', 'slant'],
      description: 'Button style variant',
      defaultValue: 'default',
    },
    color: {
      control: 'select',
      options: ['default', 'blue', 'red', 'green'],
      description: 'Button color variant',
      defaultValue: 'default',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
      defaultValue: 'medium',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
      defaultValue: false,
    },
    href: {
      control: 'text',
      description: 'Optional URL for anchor tag',
    },
    clickEvent: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<Button2Component>;

// Basic Button Story
export const Basic: Story = {
  args: {
    icon: 'heart',
    position: 'left',
    variant: 'default',
    color: 'default',
    size: 'medium',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-button-animated
        [icon]="icon"
        [position]="position"
        [variant]="variant"
        [color]="color"
        [size]="size"
        [disabled]="disabled"
        [href]="href"
        (clickEvent)="clickEvent($event)">
        Animated Button
      </lib-button-animated>
    `,
  }),
};

// Position Variants
export const PositionVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px;">
        <lib-button-animated icon="heart" position="left">Icon Left</lib-button-animated>
        <lib-button-animated icon="heart" position="right">Icon Right</lib-button-animated>
      </div>
    `,
  }),
};

// Style Variants
export const StyleVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <lib-button-animated icon="heart" position="left" variant="default">Default Style</lib-button-animated>
        <lib-button-animated icon="heart" position="left" variant="arrow">Arrow Style</lib-button-animated>
        <lib-button-animated icon="cog" position="left" variant="gear">Gear Style</lib-button-animated>
        <lib-button-animated icon="comments" position="left" variant="slant">Slant Style</lib-button-animated>
      </div>
    `,
  }),
};

// Color Variants
export const ColorVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <lib-button-animated icon="heart" position="left" color="default">Default Color</lib-button-animated>
        <lib-button-animated icon="heart" position="left" color="blue">Blue Color</lib-button-animated>
        <lib-button-animated icon="heart" position="left" color="red">Red Color</lib-button-animated>
        <lib-button-animated icon="heart" position="left" color="green">Green Color</lib-button-animated>
      </div>
    `,
  }),
};

// Size Variants
export const SizeVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <lib-button-animated icon="heart" position="left" size="small">Small Button</lib-button-animated>
        <lib-button-animated icon="heart" position="left" size="medium">Medium Button</lib-button-animated>
        <lib-button-animated icon="heart" position="left" size="large">Large Button</lib-button-animated>
      </div>
    `,
  }),
};

// Disabled State
export const DisabledButton: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px;">
        <lib-button-animated icon="heart" position="left">Enabled Button</lib-button-animated>
        <lib-button-animated icon="heart" position="left" [disabled]="true">Disabled Button</lib-button-animated>
      </div>
    `,
  }),
};

// Button with Link
export const ButtonWithLink: Story = {
  render: () => ({
    template: `
      <lib-button-animated icon="link" position="left" href="https://example.com">
        Link Button
      </lib-button-animated>
    `,
  }),
};

// All Combinations
export const GridShowcase: Story = {
  render: () => ({
    template: `
      <h3 style="margin-bottom: 16px;">Default Button Variants</h3>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 32px;">
        <lib-button-animated icon="heart" position="left" variant="default">Icon Left</lib-button-animated>
        <lib-button-animated icon="heart" position="right" variant="default">Icon Right</lib-button-animated>
        <lib-button-animated icon="heart" position="left" variant="arrow">Arrow Left</lib-button-animated>
        <lib-button-animated icon="heart" position="right" variant="arrow">Arrow Right</lib-button-animated>
        <lib-button-animated icon="cog" position="left" variant="gear">Gear Left</lib-button-animated>
        <lib-button-animated icon="cog" position="right" variant="gear">Gear Right</lib-button-animated>
        <lib-button-animated icon="comments" position="left" variant="slant">Slant Left</lib-button-animated>
        <lib-button-animated icon="comments" position="right" variant="slant">Slant Right</lib-button-animated>
      </div>

      <h3 style="margin-bottom: 16px;">Different Colors</h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px;">
        <lib-button-animated icon="heart" position="left" color="blue">Blue</lib-button-animated>
        <lib-button-animated icon="heart" position="left" color="red">Red</lib-button-animated>
        <lib-button-animated icon="heart" position="left" color="green">Green</lib-button-animated>
      </div>
    `,
  }),
};
