export interface NavItem {
  label: string;
  icon?: string;
  route?: string;
  children?: NavItem[];
  expanded?: boolean;
  disabled?: boolean;
  action?: () => void;
  id?: string | number;
  badge?: {
    value: string;
    severity?: string;
  };
  styleClass?: string;
}

export type SidenavVariant = '1' | '2' | '3';
