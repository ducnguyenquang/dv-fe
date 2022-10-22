export interface Category {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  _id?: string;
}

export type CategoryCreatePayload = Pick<
Category,
  'name' | 'slug' | 'description'
> & {
  sendActivationEmail: boolean;
};

export type CategoryUpdatePayload = Pick<
Category,
  'name' | 'slug' | 'description'
>;

type CategoryQueryBase = {
  size?: number;
  pagination?: {
    offset: number;
    limit: number;
  };
  sort?: {
    id: string;
    desc: boolean;
  };
  search?: {
    searchText: string;
    searchColumn: string;
  };
  roles?: string[];
  states?: string[];
};

export type CategoryQueryPayload = Partial<CategoryQueryBase>;

export type CategoryDetailPayload = Pick<Category, 'id'> & {
  _id?: string;
};

export type CategoryDeletePayload = Pick<Category, 'id'>;

export type AllCategoriesQueryPayload = {
  search: string;
};
