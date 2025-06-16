import { ApiResponse } from "./apiResponse";

export interface CategoriesRequest {
    locale?: string;
    limit?: number;
    offset?: number;
}

export interface CategoriesResponse {
    categories: ApiResponse<Category>;
}

export interface Category {
    href: string;
    icons: CategoryIcon[];
    id: string;
    name: string;
}

interface CategoryIcon {
    height: number | null;
    url: string;
    width: number | null;
}
