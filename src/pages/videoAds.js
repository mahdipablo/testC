// src/pages/videoAds.js
export function render() {
  // اول محتوا رو رندر می‌کنیم
  setTimeout(() => {
    // پیدا کردن محل قرار دادن تبلیغ
    const adContainer = document.getElementById("video-ads-container");
    if (!adContainer) return;

    // ایجاد تگ تبلیغ
    const ins = document.createElement("ins");
    ins.className = "surfe-be";
    ins.setAttribute("data-sid", "411019");
    adContainer.appendChild(ins);

    // اگر اسکریپت قبلاً لود نشده، بارگذاری کن
    if (!window.surfeScriptLoaded) {
      const script = document.createElement("script");
      script.src = "//static.surfe.pro/js/net.js";
      script.onload = () => {
        window.adsurfebe = window.adsurfebe || [];
        window.adsurfebe.push({});
      };
      document.body.appendChild(script);
      window.surfeScriptLoaded = true;
    } else {
      // اگر اسکریپت قبلاً لود شده، فقط push کن
      window.adsurfebe = window.adsurfebe || [];
      window.adsurfebe.push({});
    }
  }, 100); // بعد از رندر کامل DOM اجرا می‌شه

  return `
    <div class="video-ads-page">
      <h2>🎥 Video Ads</h2>
      <p>Watch ads to earn rewards.</p>
      <div id="video-ads-container"></div>
      <button class="action-btn">Watch Ad (+5 TON)</button>
    </div>
  `;
}
