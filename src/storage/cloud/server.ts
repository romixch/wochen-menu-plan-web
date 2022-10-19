import { MenuDailyPlan, MenuPlan } from "../../model/model";

export const BASE_URL = "https://wochenmenuplan.romix.ch/";

export interface ServerMenuPlan extends MenuPlan {
    dailyPlans: ServerMenuDailyPlan[];
}
export interface ServerMenuDailyPlan extends MenuDailyPlan {
    serverUpdateTimestamp: number;
}

export const fetchMenus = async (email: string, lastSyncedServerTimestamp: string, accessToken: string) => {
    const newServerMenusResponse = await fetch(`${BASE_URL}menu/${email}/${lastSyncedServerTimestamp}`, { headers: { 'accessToken': accessToken } });
    if (newServerMenusResponse.status !== 200) {
        throw new Error('Wrong access token')
    }
    const serverMenus: ServerMenuPlan = await newServerMenusResponse.json();
    return serverMenus
}