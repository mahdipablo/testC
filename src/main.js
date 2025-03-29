// src/main.js
import { render as renderHome } from './pages/home.js';
import { render as renderTasks } from './pages/tasks.js';
import { render as renderVideoAds } from './pages/videoAds.js';
import { render as renderSurfing } from './pages/surfing.js';
import { render as renderReferrals } from './pages/referrals.js';

// تعریف تب‌ها
const tabs = [
  { id: "home", text: "Home", icon: "🏠" },
  { id: "tasks", text: "Tasks", icon: "📋" },
  { id: "video-ads", text: "Video Ads", icon: "📢" },
  { id: "surfing", text: "Surfing", icon: "🌐" },
  { id: "referrals", text: "Referrals", icon: "👥" },
];

// تعریف صفحه‌ها
const pages = {
  home: { render: renderHome },
  tasks: { render: renderTasks },
  "video-ads": { render: renderVideoAds },
  surfing: { render: renderSurfing },
  referrals: { render: renderReferrals },
};

let currentTab = tabs[0].id;

// رندر Tabbar
function renderTabbar() {
  const tabbar = document.createElement("div");
  tabbar.className = "tabbar";

  tabs.forEach(({ id, text, icon }) => {
    const tabItem = document.createElement("div");
    tabItem.className = "tabbar-item";
    tabItem.innerHTML = `<span class="icon">${icon}</span><span class="text">${text}</span>`;
    tabItem.dataset.id = id;

    if (id === currentTab) {
      tabItem.classList.add("selected");
    }

    tabItem.addEventListener("click", () => {
      currentTab = id;
      document.querySelectorAll(".tabbar-item").forEach((item) => item.classList.remove("selected"));
      tabItem.classList.add("selected");
      renderContent();
    });

    tabbar.appendChild(tabItem);
  });

  document.getElementById("tabbar").appendChild(tabbar);
}

// رندر محتوای صفحه
function renderContent() {
  const content = document.getElementById("content");
  content.innerHTML = "";

  const page = pages[currentTab];
  if (page && page.render) {
    content.innerHTML = page.render();
  } else {
    content.innerHTML = `<h2>Page Not Found</h2><p>Content for ${currentTab} is not available.</p>`;
  }
}

// رندر اولیه
renderTabbar();
renderContent();