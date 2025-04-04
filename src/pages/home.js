export function render() {
    const initDataUnsafe = window.Telegram?.WebApp?.initDataUnsafe || {};
    const first_name = initDataUnsafe.user?.first_name || "Unknown";
    const userId = initDataUnsafe.user?.id || "N/A";
    const initData = window.Telegram?.WebApp?.initData || "";

    const html = `
      <div class="home-page">
        <div class="header">
          <div class="user-info">
            <span class="username">@${first_name}</span>
            <span class="uid">UID: ${userId}</span>
          </div>
          <div class="icons">
            <span class="icon">⚙️</span>
            <span class="icon">🔔</span>
          </div>
        </div>
        <div class="balance">
          <h2>Balance</h2>
          <div class="balance-amount">
            <span class="coin-icon">🪙</span>
            <span id="balance">Loading...</span>
          </div>
        </div>
        <div class="actions">
          <button class="action-btn">Wallets</button>
          <button class="action-btn">Withdraw</button>
          <button class="action-btn">History</button>
        </div>
        <div class="level">
          <span>Level 0</span>
          <span>19 860 till upgrade</span>
          <span>+0%</span>
        </div>
        <div class="validation-section">
          <h2>Validate Telegram Data</h2>
          <button id="validate-btn" class="action-btn">Validate Again</button>
          <p id="validation-result">Checking validation...</p>
        </div>
        <div class="claim-section">
          <h2>Home</h2>
          <p>Claim TON tokens and level up your account to earn even more.</p>
          <div class="ton-icon">💎</div>
          <button class="claim-btn">Claim</button>
        </div>

        <!-- 🔻 تبلیغات Surfe.pro -->
        <div class="ads-section" style="margin-top: 20px;">
          <script src="//static.surfe.pro/js/net.js"></script>
          <ins class="surfe-be" data-sid="410771"></ins>
          <script>(adsurfebe = window.adsurfebe || []).push({});</script>
        </div>
      </div>
    `;

    setTimeout(() => {
        if (userId && userId !== "N/A") {
            fetchBalance(userId);
        }
        validateData(initData);
        setupValidationButton(initData);
    }, 0);

    return html;
}
