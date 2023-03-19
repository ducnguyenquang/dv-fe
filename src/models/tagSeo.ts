
export interface TagSeo {
  id?: string;
  name?: string;
  _id?: string;
}

export type TagSeoCreatePayload = Pick<
TagSeo,
  'name'
> & {
  sendActivationEmail: boolean;
};

export type TagSeoUpdatePayload = Pick<
TagSeo,
  'name' | 'id' | '_id'
>;

type TagSeoQueryBase = {
  size?: number;
  pagination?: {
    offset: number;
    limit: number;
  };
  sort?: {
    // id: string;
    // desc: boolean;
  };
  search?: {
    searchText: string;
    searchColumn: string;
  };
  roles?: string[];
  states?: string[];
};

export type TagSeoQueryPayload = Partial<TagSeoQueryBase>;

export type TagSeoDetailPayload = Pick<TagSeo, 'id'> & {
  name?:string;
  _id?: string;
};

export type TagSeoDeletePayload = Pick<TagSeo, 'id'>;

export type AllTagSeosQueryPayload = {
  search: string;
};
