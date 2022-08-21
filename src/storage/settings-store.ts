import create from "zustand"
import { persist } from "zustand/middleware"

interface SettingsStore {
    login?: {
        email: string
        accessKey: string
    }
    setLogin: (email: string, accessKey: string) => void
}


const useSettings = create<SettingsStore>()(
    persist(
        (set) => ({
            setLogin(email, accessKey) {
                set({ login: { email, accessKey } })
            }
        }),
        { name: 'settings' }
    )
)

export default useSettings