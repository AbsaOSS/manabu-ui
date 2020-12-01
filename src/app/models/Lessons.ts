export interface Lesson {
  id?: string;
  title?: string;
  type?: string;
  markdown?: string;
  source?: string;
  category?: string;
  durationInSeconds?: number;
  order?: number;
  createdAt?: number;
  updatedAt?: number;
  course?: string;
  displayActions?: boolean;
  authors?: any[];
}
