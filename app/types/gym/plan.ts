export interface DevelopmentPlan {
  id: string;
  memberIds: string[];
  name: string;
  focus: string;
  description: string;
  coach: string;
  sessionsPerWeek: number;
}
