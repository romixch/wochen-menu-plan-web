import { List } from 'phosphor-react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import MenuCard from '../components/menu-card';
import WeekSelector from '../components/week-selector';
import useDailyPlanStore from '../storage/daily-plan-store';

import styles from './root.module.css'

function Root() {
  const getCurrentWeekDates = useDailyPlanStore((store) => store.getCurrentWeekDates)

  return (
    <div>
      <Header title="Wochen Menüplan" Right={<Link to="/settings"><List size="2rem" /></Link>} />
      <div className={styles.root}>
        <WeekSelector />
        {getCurrentWeekDates(new Date()).map((date) => <MenuCard key={date} dailyPlanDate={date} />)}
      </div>
    </div >
  );
}

export default Root;
