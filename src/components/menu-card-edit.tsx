import { MenuDailyPlan } from "../model/model"
import MealInput from "./meal-input";

type Props = React.AllHTMLAttributes<HTMLDivElement> & {
    dailyPlan: MenuDailyPlan
}

const MenuCardEdit = ({ dailyPlan, className }: Props) => {
    const breakfastCourses = dailyPlan.courses.filter(c => c.meal === 'breakfast');
    const lunchCourses = dailyPlan.courses.filter(c => c.meal === 'lunch');
    const dinnerCourses = dailyPlan.courses.filter(c => c.meal === 'dinner');

    return <div className={className}>
        {breakfastCourses.length > 0 &&
            <MealInput meal="breakfast" courses={breakfastCourses} />
        }
        {lunchCourses.length > 0 &&
            <MealInput meal="lunch" courses={lunchCourses} />
        }
        {dinnerCourses.length > 0 &&
            <MealInput meal="dinner" courses={dinnerCourses} />
        }
    </div>
}

export default MenuCardEdit
