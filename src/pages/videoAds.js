export function render() {
    // ساختار HTML را برمی‌گرداند
    return `
      <div class="video-ads-page">
        <h2>Video Ads</h2>
        <p>Watch ads to earn rewards.</p>
        <button class="action-btn" id="watch-ad-btn">Watch Ad (+5 TON)</button>
      </div>
    `;
}

export function initVideoAds() {
    // این تابع باید بعد از رندر شدن صفحه فراخوانی شود
    const button = document.getElementById("watch-ad-btn");
    if (button) {
        button.addEventListener("click", () => {
            const telegramId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || "123456"; // تستی
            const testAdUrl = `https://testc-6b6.pages.dev/surf-ad?url=${encodeURIComponent("https://example.com")}&tokens=5&telegram_id=${telegramId}`;
            
            if (window.Telegram?.WebApp?.openTelegramLink) {
                window.Telegram.WebApp.openTelegramLink(testAdUrl);
            } else {
                window.open(testAdUrl, "_blank");
            }
        });
    }
}
