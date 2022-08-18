import { Course, MenuDailyPlan } from "../model/model"
import useDailyPlanStore from "../storage/daily-plan-store";
import MealInput from "./meal-input";

type Props = React.AllHTMLAttributes<HTMLDivElement> & {
    dailyPlan: MenuDailyPlan
}

const MenuCardEdit = ({ dailyPlan, className }: Props) => {
    const updateCourse = useDailyPlanStore(state => state.updateCourse)
    const breakfastCourses = dailyPlan.courses.filter(c => c.meal === 'breakfast');
    const lunchCourses = dailyPlan.courses.filter(c => c.meal === 'lunch');
    const dinnerCourses = dailyPlan.courses.filter(c => c.meal === 'dinner');

    const handleOnCourseChange = (course: Course) => {
        updateCourse(dailyPlan.date, course)
    }

    return <div className={className}>
        {breakfastCourses.length > 0 &&
            <MealInput meal="breakfast" courses={breakfastCourses} onCourseChange={handleOnCourseChange} />
        }
        {lunchCourses.length > 0 &&
            <MealInput meal="lunch" courses={lunchCourses} onCourseChange={handleOnCourseChange} />
        }
        {dinnerCourses.length > 0 &&
            <MealInput meal="dinner" courses={dinnerCourses} onCourseChange={handleOnCourseChange} />
        }
    </div>
}

export default MenuCardEdit
