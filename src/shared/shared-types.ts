type NavItem = {
  _id: string;
  title: string;
  fullSlug: string;
  children?: NavItem[];
};
export default NavItem;
