import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ch.romix.wochenmenuplan',
  appName: 'Wochen Menüplaner',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
