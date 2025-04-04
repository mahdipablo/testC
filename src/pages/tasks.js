// src/pages/tasks.js
export function render() {


document.addEventListener('DOMContentLoaded', function () {
  window.Telegram.WebApp.BackButton.show();

  window.Telegram.WebApp.BackButton.onClick(() => {
    window.location = 'home.js';
  });
});


  
  // بعد از بارگذاری صفحه، این کد اجرا میشه
  setTimeout(() => {
    const claimBtn = document.querySelector('button');

    if (claimBtn) {
      claimBtn.addEventListener('click', () => {
        if (window.Telegram?.WebApp) {
          Telegram.WebApp.ready();
          Telegram.WebApp.BackButton.show();

          Telegram.WebApp.BackButton.onClick(() => {
            Telegram.WebApp.close(); // یا هر کاری که بخوای
          });

          alert("🎉 دکمه برگشت فعال شد! حالا می‌تونی برگردی.");
        } else {
          alert("❌ WebApp از طرف تلگرام لود نشده.");
        }
      });
    }
  }, 0);

  return `
    <div class="tasks-page">
      <h2>Tasks</h2>
      <p>Complete tasks to earn more TON tokens.</p>
      <ul>
        <li>Task 1: Follow us on Telegram (+10 TON)</li>
        <li>Task 2: Share with a friend (+20 TON)</li>
        <li>Task 3: Share with a friend (+100 TON) <button>Claim</button></li> 
      </ul>
    </div>
  `;
}
