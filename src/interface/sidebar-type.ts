/**
 *
 */
export type MenuItemType = {
  //
  label: string;
  //
  icon?: string;
  //
  to?: object;
  //
  items: MenuItemType[];
  //
  badge?: string;
  //
  preventExact?: boolean;
  //
  url?: string;
  //
  target?: string;
};
