import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import { MouseEventHandler, useState } from "react";
import MenuCardEdit from "./menu-card-edit";
import styles from './menu-card.module.css'
import plusSvg from '../icons/plus-line.svg'
import useDailyPlanStore from "../storage/daily-plan-store";

type Props = {
    dailyPlanDate: string
}

const MenuCard = ({ dailyPlanDate }: Props) => {
    const getPlan = useDailyPlanStore((store) => store.getPlan)
    const dailyPlan = getPlan(dailyPlanDate)
    const [open, setOpen] = useState(dailyPlan.courses.length === 0)
    const [showAddButtons, setShowAddButtons] = useState(false)

    const breakfastCourses = dailyPlan.courses.filter(c => c.meal === 'breakfast');
    const breakfastCourseText = breakfastCourses.map(c => c.description).join(' / ')
    const lunchCourses = dailyPlan.courses.filter(c => c.meal === 'lunch');
    const lunchCourseText = lunchCourses.map(c => c.description).join(' / ')
    const dinnerCourses = dailyPlan.courses.filter(c => c.meal === 'dinner');
    const dinnerCourseText = dinnerCourses.map(c => c.description).join(' / ')
    const weekdayText = format(parseISO(dailyPlan.date), open ? "iiii" : "iiiiii", { locale: de })

    const handleOnTitleClick = () => {
        if (open && dailyPlan.courses.length === 0) {
            // Keep it open when daily plan contains no courses
        } else {
            setOpen(!open)
            if (open) setShowAddButtons(false)
        }
    }

    const handleOnPlusClicked: MouseEventHandler = (event) => {
        event.stopPropagation();
        setShowAddButtons(!showAddButtons)
    }

    const handleOnAddCourse: MouseEventHandler = (event) => {
        event.stopPropagation();
        setShowAddButtons(false)
    }

    return <div className={styles.menuCardContainer}>
        <div onClick={handleOnTitleClick} className={`${styles.menuCard} ${open ? styles.open : styles.closed}`}>
            <div className={`${styles.weekday} ${open ? styles.open : styles.closed}`}>{weekdayText}
                {open && <div className={styles.titleButtonContainer}>
                    {showAddButtons && <div className={styles.addCourseButtonContainer}>
                        <button className={styles.addCourseButton} onClick={handleOnAddCourse}>Morgen</button>
                        <button className={styles.addCourseButton} onClick={handleOnAddCourse}>Mittag</button>
                        <button className={styles.addCourseButton} onClick={handleOnAddCourse}>Abend</button>
                    </div>}
                    <img src={plusSvg} className={styles.button} role='button' alt='hinzufügen' height="5em" onClick={handleOnPlusClicked} />
                </div>}
            </div>
            <div className={`${styles.daySummary} ${open ? styles.open : styles.closed}`}>
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
        {dailyPlan.courses.length > 0 && <MenuCardEdit className={`${styles.menuCardEdit} ${open ? styles.open : styles.closed}`} dailyPlan={dailyPlan} />}
    </div>
}

export default MenuCard;