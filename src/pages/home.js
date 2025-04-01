// src/pages/home.js
export function render() {
    // دریافت داده‌های کاربر از تلگرام
    const initDataUnsafe = window.Telegram?.WebApp?.initDataUnsafe || {};
    const first_name = initDataUnsafe.user?.first_name || "Unknown";
    const userId = initDataUnsafe.user?.id || "N/A";
    console.log("initDataUnsafe", initDataUnsafe);

    const initData = window.Telegram?.WebApp?.initData || "";
    console.log("initData", initData);

    // HTML اولیه
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
          <button id="validate-btn" class="action-btn">Validate</button>
          <p id="validation-result">Result will appear here...</p>
        </div>
        <div class="claim-section">
          <h2>Home</h2>
          <p>Claim TON tokens and level up your account to earn even more.</p>
          <div class="ton-icon">💎</div>
          <button class="claim-btn">Claim</button>
        </div>
      </div>

      <style>
        .success {
            color: #28a745;
            background-color: #e9fce9;
            border: 2px solid #28a745;
            padding: 5px;
        }
        .error {
            color: #dc3545;
            background-color: #fce9e9;
            border: 2px solid #dc3545;
            padding: 5px;
        }
        .loading {
            background-color: #17a2b8;
            color: white;
            border: 2px solid #17a2b8;
           
