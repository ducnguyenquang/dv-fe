export enum RoleOptions {
  ADMIN = 'ADMIN',
  SALE = 'SALE',
  CUSTOMER = 'CUSTOMER',
}

export const ROLE_DROPDOWN_OPTIONS = [
  {
    label: 'user.role.admin',
    value: RoleOptions.ADMIN,
  },
  {
    label: 'user.role.sale',
    value: RoleOptions.SALE,
  },
  {
    label: 'user.role.customer',
    value: RoleOptions.CUSTOMER,
  },
];
