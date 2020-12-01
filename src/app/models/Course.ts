export interface Course {
  id?: string;
  title?: string;
  image?: string;
  isPublished?: number;
  description?: string;
  lessons?: any[];
  authors?: any[];
  tags?: any[];
  coursePreRequisites?: string;
  courseAudience?: string;
  courseLevel?: string;
}
