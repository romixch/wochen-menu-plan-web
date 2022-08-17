import MenuCard from '../components/menu-card';
import WeekSelector from '../components/week-selector';
import useDailyPlanStore from '../storage/daily-plan-store';

import './root.css';

function Root() {
  const getCurrentWeekDates = useDailyPlanStore((store) => store.getCurrentWeekDates)
  return (
    <div className="root">
      <WeekSelector />
      {getCurrentWeekDates(new Date()).map((date) => <MenuCard key={date} dailyPlanDate={date} />)}
    </div>
  );
}

export default Root;
