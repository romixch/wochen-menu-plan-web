import { useState } from 'react'
import LeftSvg from '../icons/chevron-left.svg'
import RightSvg from '../icons/chevron-right.svg'
import './week-selector.css'

const WeekSelector = () => {
    const [weekOffset, setWeekOffset] = useState(0)

    const handleOnLeftPressed = () => {
        setWeekOffset(weekOffset - 1)
    }

    const handleOnRightPressed = () => {
        setWeekOffset(weekOffset + 1)
    }

    return <div>
        <img src={LeftSvg} className='arrow' role='button' alt='nach links' onClick={handleOnLeftPressed} />
        {getWeekText(weekOffset)}
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