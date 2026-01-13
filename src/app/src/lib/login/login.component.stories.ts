import type { Meta, StoryObj } from '@storybook/angular';
import { LoginComponent } from './login.component';

const meta: Meta<LoginComponent> = {
  component: LoginComponent,
  title: 'LoginComponent',
};
export default meta;
type Story = StoryObj<LoginComponent>;

export const SimpleCard: Story = {
  args: {
    currentStyle: 'style1',
  },
};

export const Style2: Story = {
  args: {
    currentStyle: 'style2',
  },
};

export const Style3: Story = {
  args: {
    currentStyle: 'style3',
  },
};

export const Style4: Story = {
  args: {
    currentStyle: 'style4',
  },
};

export const Glass: Story = {
  args: {
    currentStyle: 'style5',
  },
};
