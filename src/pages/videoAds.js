export function render() {
    return `
      <div class="video-ads-page">
        <h2>Video Ads</h2>
        <p>Watch ads to earn rewards.</p>
        <button class="action-btn" id="watch-ad-btn">Watch Ad (+5 TON)</button>
      </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("watch-ad-btn");
    if (button) {
        button.addEventListener("click", () => {
            const testAdUrl = "https://testc-6b6.pages.dev/surf-ad?url=https%3A%2F%2Fexample.com&tokens=5&telegram_id=123456";
            if (window.Telegram?.WebApp) {
                window.Telegram.WebApp.openTelegramLink(testAdUrl);
            } else {
                window.open(testAdUrl, "_blank");
            }
        });
    }
});
