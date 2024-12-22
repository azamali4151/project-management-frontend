import { createI18n } from 'vue-i18n';


const messages = {
  en: {
    dashboard: 'Dashboard',
    project: 'Project',
    task: 'Task',
    welcome: 'Welcome to the Dashboard',
    content: 'This is the main content area where you can display additional components or information.',
    charts: 'You can add charts, tables, or any relevant data here.',
    logout: 'Logout',
  },
  bn: {
    dashboard: 'ড্যাশবোর্ড',
    project: 'প্রকল্প',
    task: 'কাজ',
    welcome: 'ড্যাশবোর্ডে স্বাগতম',
    content: 'এটি প্রধান কন্টেন্ট এরিয়া যেখানে আপনি অতিরিক্ত কম্পোনেন্ট বা তথ্য প্রদর্শন করতে পারেন।',
    charts: 'আপনি এখানে চার্ট, টেবিল বা প্রাসঙ্গিক ডেটা যোগ করতে পারেন।',
    logout: 'লগআউট',
  },
};


const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

export default i18n;
