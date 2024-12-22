import { createI18n } from 'vue-i18n';


const messages = {
  en: {
    dashboard: 'Dashboard',
    project: 'Project',
    task: 'Task',
    welcome: 'Welcome to the Dashboard',
    content: 'Project management software is a tool designed to help individuals, teams, and organizations plan, execute, and manage projects effectively.',
    charts: 'You can add charts, tables, or any relevant data here.',
    logout: 'Logout',
  },
  bn: {
    dashboard: 'ড্যাশবোর্ড',
    project: 'প্রকল্প',
    task: 'কাজ',
    welcome: 'ড্যাশবোর্ডে স্বাগতম',
    content: 'প্রজেক্ট ম্যানেজমেন্ট সফ্টওয়্যার হল এমন একটি টুল যা ব্যক্তি, দল এবং সংস্থাগুলিকে কার্যকরভাবে প্রকল্পগুলি পরিকল্পনা, সম্পাদন এবং পরিচালনা করতে সহায়তা করার জন্য ডিজাইন করা হয়েছে।',
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
