// src/pages/videoAds.js
export function render() {
  return `
    <div class="videoAds-page">
      <p>Invite friends and earn bonuses.</p>
      <button id="openLinkBtn">Open Offer Page</button>
    </div>
  `;
}

export function afterRender() {
  document.getElementById("openLinkBtn").addEventListener("click", () => {
    // لینک صفحه ساده‌ای که می‌خوای باز شه
    window.open("https://testc-6b6.pages.dev/surf-ad", "_blank");
  });
}
