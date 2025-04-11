export function render() {
  setTimeout(() => {
    const script = document.createElement("script");
    script.src = "//static.surfe.pro/js/net.js";
    document.body.appendChild(script);

    const ins = document.createElement("ins");
    ins.className = "surfe-be";
    ins.setAttribute("data-sid", "411019");
    document.body.appendChild(ins);

    script.onload = () => {
      window.adsurfebe = window.adsurfebe || [];
      window.adsurfebe.push({});
    };
  }, 0);

  return `
    <div class="video-ads-page">
      <h2>Video Ads</h2>
      <p>Watch ads to earn rewards.</p>
      <div id="ad-container"></div>
      <button class="action-btn">Watch Ad (+5 TON)</button>
    </div>
  `;
}
