import { useEffect, useState } from 'react';
import MenuCard from '../components/menu-card';
import WeekSelector from '../components/week-selector';
import { MenuPlan } from '../model/model';
import { getMenuPlan } from '../storage/daily-plans';

import './root.css';

function Root() {
  const [menuPlan, setMenuPlan] = useState<MenuPlan | undefined>()
  useEffect(() => {
    getMenuPlan(new Date('2022-07-25'), new Date('2022-07-31'))
      .then((plan => setMenuPlan(plan)))
  }, [])
  return (
    <div className="root">
      <WeekSelector />
      {menuPlan?.dailyPlans.map((dailyPlan) => <MenuCard dailyPlan={dailyPlan} />)}
    </div>
  );
}

export default Root;
