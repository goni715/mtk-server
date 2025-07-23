

export interface ISize {
  size: string;
  slug: string;
}


export type TDiningQuery = {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};