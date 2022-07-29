import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import { useState } from "react";
import { MenuDailyPlan } from "../model/model";
import styles from './menu-card.module.css'

type Props = {
    dailyPlan: MenuDailyPlan
}


const MenuCard = ({ dailyPlan }: Props) => {
    const [open, setOpen] = useState(false)

    const breakfastCourses = dailyPlan.courses.filter(c => c.meal === 'breakfast');
    const breakfastCourseText = breakfastCourses.map(c => c.description).join(' / ')
    const lunchCourses = dailyPlan.courses.filter(c => c.meal === 'lunch');
    const lunchCourseText = lunchCourses.map(c => c.description).join(' / ')
    const dinnerCourses = dailyPlan.courses.filter(c => c.meal === 'dinner');
    const dinnerCourseText = dinnerCourses.map(c => c.description).join(' / ')

    const handleOnTitleClick = () => {
        setOpen(!open)
    }
    const weekdayText = format(parseISO(dailyPlan.date), open ? "iiii" : "iiiiii", { locale: de })

    return <div onClick={handleOnTitleClick} className={`${styles.menuCard} ${open ? styles.open : styles.closed}`}>
        <div className={`${styles.weekday} ${open ? styles.open : styles.closed}`}>{weekdayText}</div>
        <div>
            {breakfastCourses.length > 0 &&
                <div className={styles.course}>Morgen: {breakfastCourseText}</div>
            }
            {lunchCourses.length > 0 &&
                <div className={styles.course}>Mittag: {lunchCourseText}</div>
            }
            {dinnerCourses.length > 0 &&
                <div className={styles.course}>Abend: {dinnerCourseText}</div>
            }
        </div>
    </div>
}

export default MenuCard;