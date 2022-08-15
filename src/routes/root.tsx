import MenuCard from '../components/menu-card';
import WeekSelector from '../components/week-selector';
import useDailyPlanStore from '../storage/daily-plan-store';

import './root.css';

function Root() {
  const store = useDailyPlanStore()
  return (
    <div className="root">
      <WeekSelector />
      {store.plans.map((dailyPlan) => <MenuCard key={dailyPlan.date} dailyPlan={dailyPlan} />)}
    </div>
  );
}

export default Root;
