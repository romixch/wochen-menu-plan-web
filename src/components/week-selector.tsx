import { addWeeks, endOfWeek, format, startOfWeek } from 'date-fns'
import LeftSvg from '../icons/chevron-left.svg'
import RightSvg from '../icons/chevron-right.svg'
import useDailyPlanStore from '../storage/daily-plan-store'
import './week-selector.css'

const WeekSelector = () => {
    const weekOffset = useDailyPlanStore((state) => state.weekOffset)
    const decrementWeekOffset = useDailyPlanStore((state) => state.decrementWeekOffset)
    const incrementWeekOffset = useDailyPlanStore((state) => state.incrementWeekOffset)
    const resetWeekOffset = useDailyPlanStore((state) => state.resetWeekOffset)

    const handleOnLeftPressed = () => {
        decrementWeekOffset()
    }

    const handleOnRightPressed = () => {
        incrementWeekOffset()
    }

    const handleOnClickTitle = () => {
        resetWeekOffset()
    }

    return <div className='week-selector'>
        <img src={LeftSvg} className='arrow' role='button' alt='nach links' onClick={handleOnLeftPressed} />
        <div onClick={handleOnClickTitle} className='week-selector-text'>
            <div className='text'>{getWeekText(weekOffset)}</div>
            <div className='date'>{getDatesText(weekOffset)}</div>
        </div>
        <img src={RightSvg} className='arrow' role='button' alt='nach rechts' onClick={handleOnRightPressed} />
    </div>
}

export default WeekSelector

const getWeekText = (weekOffset: number) => {
    if (weekOffset === 0) {
        return `Diese Woche`;
    } else if (weekOffset === -1) {
        return "Letzte Woche ";
    } else if (weekOffset === -2) {
        return "Vorletzte Woche ";
    } else if (weekOffset < -2) {
        return `Vor ${weekOffset * -1} Wochen `;
    } else if (weekOffset === 1) {
        return "Nächste Woche ";
    } else if (weekOffset === 2) {
        return "Übernächste Woche ";
    } else {
        return `In ${weekOffset} Wochen `;
    }
}

const getDatesText = (weekOffset: number) => {
    const startDate = startOfWeek(addWeeks(new Date(), weekOffset), { weekStartsOn: 1 });
    const endDate = endOfWeek(startDate, { weekStartsOn: 1 });
    return "(" + format(startDate, "d.M.") + " - " + format(endDate, "d.M.") + ")";
}