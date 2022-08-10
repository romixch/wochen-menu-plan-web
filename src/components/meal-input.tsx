import { Course, Meal, translateMeal } from "../model/model";
import styles from './meal-input.module.css'

interface Props {
    meal: Meal
    courses: Course[]
}

const MealInput = ({ meal, courses }: Props) => (<><div className={styles.title}>{translateMeal(meal)}
</div>
    {courses.map(course => <div className={styles.courseContainer} key={course.id}><input className={styles.input} defaultValue={course.description}></input></div>)}</>)



export default MealInput;