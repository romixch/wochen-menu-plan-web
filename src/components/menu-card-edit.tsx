import { MenuDailyPlan } from "../model/model"

type Props = React.AllHTMLAttributes<HTMLDivElement> & {
    dailyPlan: MenuDailyPlan
}

const MenuCardEdit = ({ dailyPlan, className }: Props) => {
    const breakfastCourses = dailyPlan.courses.filter(c => c.meal === 'breakfast');
    const breakfastCourseText = breakfastCourses.map(c => c.description).join(' / ')
    const lunchCourses = dailyPlan.courses.filter(c => c.meal === 'lunch');
    const lunchCourseText = lunchCourses.map(c => c.description).join(' / ')
    const dinnerCourses = dailyPlan.courses.filter(c => c.meal === 'dinner');
    const dinnerCourseText = dinnerCourses.map(c => c.description).join(' / ')

    return <div className={className}>
        {breakfastCourses.length > 0 &&
            <div>Morgen: {breakfastCourseText}</div>
        }
        {lunchCourses.length > 0 &&
            <div>Mittag: {lunchCourseText}</div>
        }
        {dinnerCourses.length > 0 &&
            <div>Abend: {dinnerCourseText}</div>
        }
    </div>
}

export default MenuCardEdit