// src/pages/videoAds.js
export function render() {
  return `
    <div class="videoAds-page">
      <p>Invite friends and earn bonuses.</p>
      <button id="openLinkBtn">Open Offer Page</button>
      
      <!-- مرورگر داخلی (مخفی در ابتدا) -->
      <div id="internalBrowser" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: white; z-index: 1000;">
        <div style="display: flex; align-items: center; padding: 10px; background: #f0f0f0;">
          <button id="backButton" style="margin-right: 10px; padding: 5px 10px;">← Back</button>
          <div id="urlDisplay" style="flex-grow: 1; text-align: center; overflow: hidden; text-overflow: ellipsis;"></div>
          <button id="closeBrowser" style="padding: 5px 10px;">Close</button>
        </div>
        <iframe id="browserFrame" style="width: 100%; height: calc(100% - 40px); border: none;"></iframe>
      </div>
    </div>
  `;
}

export function afterRender() {
  const browserContainer = document.getElementById("internalBrowser");
  const browserFrame = document.getElementById("browserFrame");
  const backButton = document.getElementById("backButton");
  const closeButton = document.getElementById("closeBrowser");
  const urlDisplay = document.getElementById("urlDisplay");
  
  document.getElementById("openLinkBtn").addEventListener("click", () => {
    // نمایش مرورگر داخلی
    browserContainer.style.display = "block";
    // بارگذاری صفحه در iframe
    browserFrame.src = "https://testc-6b6.pages.dev/surf-ad";
    urlDisplay.textContent = "https://testc-6b6.pages.dev/surf-ad";
  });
  
  // دکمه برگشت
  backButton.addEventListener("click", () => {
    try {
      browserFrame.contentWindow.history.back();
    } catch (e) {
      console.log("Cannot go back:", e);
    }
  });
  
  // دکمه بستن مرورگر
  closeButton.addEventListener("click", () => {
    browserContainer.style.display = "none";
    browserFrame.src = "";
  });
  
  // به روز رسانی نمایش URL هنگام تغییر تاریخچه
  browserFrame.addEventListener("load", () => {
    try {
      urlDisplay.textContent = browserFrame.contentWindow.location.href;
    } catch (e) {
      // برای خطاهای امنیتی بین دامنه‌ای
      urlDisplay.textContent = browserFrame.src;
    }
  });
}
