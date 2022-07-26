export interface Course {
  id: number;
  sequence: number;
  meal: Meal
  description: string;
  url?: string;
}

export type Meal = "breakfast" | "lunch" | "dinner"
export interface MenuDailyPlan {
  date: string; // Must be of yyyy-MM-dd (ISO date)
  courses: Course[];
  revision?: number;
}

export interface MenuPlan {
  dailyPlans: MenuDailyPlan[];
}

export const getCourseById = (courses: Course[], id: number): Course => {
  return courses.filter(c => c.id === id)[0]
}