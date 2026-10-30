export interface NavigationItem {
  readonly label: string;
  readonly href: `#${string}` | `/${string}`;
}
