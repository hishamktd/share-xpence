/**
 * Category and SubCategory types
 */

export interface Category {
  id: string;
  userId?: string; // null for system categories
  name: string;
  icon?: string;
  color?: string;
  description?: string;
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubCategory {
  id: string;
  categoryId: string;
  name: string;
  icon?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryWithSubCategories extends Category {
  subCategories: SubCategory[];
}
