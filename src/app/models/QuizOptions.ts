
export interface QuizOptions {
  step: number;
  type: string;
  boolStep?: {
    question?: string;
    selection?: string;
  };
  multiStep?: {
    question?: string;
    option1: string;
    option2: string;
    option3?: string;
    option4?: string;
    selection: string;
  };
}
