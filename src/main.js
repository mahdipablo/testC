// src/main.js
import { render as renderHome } from './pages/home.js';
import { render as renderTasks, init as initTasks } from './pages/tasks.js';
import { render as renderVideoAds, init as initVideoAds } from './pages/videoAds.js';
import { render as renderSurfing, init as initSurfing } from './pages/surfing.js';
import { render as renderReferrals } from './pages/referrals.js';

// تعریف تب‌ها و صفحات (بقیه کد بدون تغییر...)

// رندر محتوای صفحه + مقداردهی اولیه
function renderContent() {
  const content = document.getElementById("content");
  content.innerHTML = "";

  const page = pages[currentTab];
  if (page && page.render) {
    content.innerHTML = page.render();
    
    // مقداردهی اولیه برای هر صفحه بعد از رندر
    switch(currentTab) {
      case 'tasks':
        initTasks?.();
        break;
      case 'video-ads':
        initVideoAds?.();
        break;
      case 'surfing':
        initSurfing?.();
        break;
      // صفحات دیگر اگر نیاز به init داشتند...
    }
  } else {
    content.innerHTML = `<h2>Page Not Found</h2>`;
  }
}
