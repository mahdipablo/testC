// src/pages/videoAds.js
export function render() {
  return `
    <div class="video-ads-page">
      <h2>Video Ads</h2>
      <p>Watch ads to earn rewards.</p>
      <button class="action-btn">Watch Ad (+5 TON)</button>

      <!-- اضافه کردن اسکریپت‌ها و تگ‌های موردنظر -->
      <script src="//static.surfe.pro/js/net.js"></script>
      <ins class="surfe-be" data-sid="410890"></ins>
      <script>(adsurfebe = window.adsurfebe || []).push({});</script>
    </div>
  `;
}
