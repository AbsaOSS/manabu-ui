export interface Step {
    step: number;
    label: string;
    status: StepStatus;
  }
  
  export interface SubStep {
    id: number;
    label: string;
  }
  
  
  export interface SubStep {
    id: number;
    label: string;
  }

  export enum StepStatus {
    Playing = "PLAYING",
    Watching = "WATCHING",
    Unwatched = "UNWATCHED",
    Completed = "COMPLETED",
    Current = "CURRENT"
  }
  
  