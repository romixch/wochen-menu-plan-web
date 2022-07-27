import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import { useState } from "react";
import { MenuDailyPlan } from "../model/model";
import './menu-card.css'

type Props = {
    dailyPlan: MenuDailyPlan
}


const MenuCard = ({ dailyPlan }: Props) => {
    const [open, setOpen] = useState(false)

    const handleOnTitleClick = () => {
        setOpen(!open)
    }
    const weekdayText = format(parseISO(dailyPlan.date), open ? "iiii" : "iiiiii", { locale: de })

    return <div className={`menu-card ${open ? 'open' : 'closed'}`}>
        <div className='week' onClick={handleOnTitleClick}>{weekdayText}</div>
    </div>
}

export default MenuCard;