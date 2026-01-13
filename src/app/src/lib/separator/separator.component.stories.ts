import type { Meta, StoryObj } from '@storybook/angular';
import { SeparatorComponent } from './separator.component';

const meta: Meta<SeparatorComponent> = {
  component: SeparatorComponent,
  title: 'SeparatorComponent',
};
export default meta;
type Story = StoryObj<SeparatorComponent>;

export const HorizontalOrSeparator: Story = {
  args: {},
};
