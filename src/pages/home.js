// src/pages/home.js
export function render() {
    // دریافت داده‌های کاربر از تلگرام
    const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe || {};
    const first_name  = initDataUnsafe.user?.first_name  || "Unknown";
    const userId = initDataUnsafe.user?.id || "N/A";
    console.log("initDataUnsafe",initDataUnsafe)
    const initData = window.Telegram.WebApp.initData || {};
    console.log("initData",initData)
    // HTML اولیه
    const html = `
      <div class="home-page">
        <div class="header">
          <div class="user-info">
            <span class="username">@${first_name }</span>
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
    `;
  
    // بعد از رندر HTML، درخواست‌ها رو اجرا می‌کنیم
    setTimeout(() => {
      // دریافت موجودی
      fetchBalance();
  
      // اعتبارسنجی داده‌های تلگرام
      const validateBtn = document.getElementById("validate-btn");
      const validationResult = document.getElementById("validation-result");
  
      validateBtn.addEventListener("click", async () => {
        validationResult.textContent = "Validating...";
        try {
          const response = await fetch("https://coin-surf.sbs/3/server.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ initData  }),
          });
  
          const result = await response.json();
          validationResult.textContent = JSON.stringify(result, null, 2);
        } catch (error) {
          validationResult.textContent = "Error: " + error.message;
        }
      });
    }, 0);
  
    return html;
  }
  
  // تابع برای دریافت موجودی
  async function fetchBalance() {
    const balanceElement = document.getElementById("balance");
    try {
      const response = await fetch("https://coin-surf.sbs/index.php/getbalance", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const result = await response.json();
      if (result.balance) {
        balanceElement.textContent = result.balance;
      } else {
        balanceElement.textContent = "Error loading balance";
      }
    } catch (error) {
      balanceElement.textContent = "Error: " + error.message;
    }
  }
