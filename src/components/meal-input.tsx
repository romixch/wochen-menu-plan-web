import { Course, Meal, translateMeal } from "../model/model";
import styles from './meal-input.module.css'

interface Props {
    meal: Meal
    courses: Course[]
    onCourseChange: (course: Course) => void
}

const MealInput = ({ meal, courses, onCourseChange }: Props) => {
    const handleOnBlur = (course: Course): React.FocusEventHandler<HTMLInputElement> => (e) => {
        if (onCourseChange) {
            onCourseChange({ ...course, description: e.target.value })
        }
    }
    return <>
        <div className={styles.title}>{translateMeal(meal)}
        </div>
        {courses.map(course => <div className={styles.courseContainer} key={course.id}><input className={styles.input} defaultValue={course.description} onBlur={handleOnBlur(course)}></input></div>)}
    </>
}



export default MealInput;