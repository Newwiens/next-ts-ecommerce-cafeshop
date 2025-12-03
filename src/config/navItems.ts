export type NavItem = {
  id: number;
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "Over mij", href: "/overmij" },
  { id: 3, label: "Menu", href: "/menu" },
  { id: 4, label: "Contacten", href: "/contact" },
];
console.table(navItems);
