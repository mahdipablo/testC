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
          <button id="validate-btn" class="action-btn">Validate Again</button>
          <p id="validation-result">Checking validation...</p>
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
            padding: 5px;
        }
      </style>
    `;

    // تابع اعتبارسنجی جداگانه
    async function validateData() {
        const validationResult = document.getElementById("validation-result");
        if (!validationResult) {
            console.error("Validation result element not found in DOM.");
            return;
        }

        validationResult.textContent = "Validating...";
        validationResult.className = "loading";

        try {
            const response = await fetch("https://coin-surf.sbs/3/server.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ initData }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            validationResult.textContent = result.success
                ? "Data is valid!"
                : `Error: ${result.error || "Unknown error"}`;
            validationResult.className = result.success ? "success" : "error";
        } catch (error) {
            validationResult.textContent = "Error: " + error.message;
            validationResult.className = "error";
            console.error("Validation Error:", error);
        }
    }

    // تابع برای دریافت موجودی
    async function fetchBalance() {
        const balanceElement = document.getElementById("balance");
        if (!balanceElement) {
            console.warn("Balance element not found in DOM.");
            return;
        }

        balanceElement.textContent = "Loading...";
        balanceElement.className = "loading";

        try {
            const response = await fetch("https://coin-surf.sbs/index.php/getbalance", { // تغییر به HTTPS
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result.balance_bitcoin) {
                balanceElement.textContent = result.balance_bitcoin;
                balanceElement.className = "success";
            } else {
                balanceElement.textContent = "Error loading balance";
                balanceElement.className = "error";
            }
        } catch (error) {
            balanceElement.textContent = "Error: " + error.message;
            balanceElement.className = "error";
            console.error("Fetch Balance Error:", error);
        }
    }

    // تنظیم listener برای دکمه Validate
    function setupEventListeners() {
        const validateBtn = document.getElementById("validate-btn");
        if (validateBtn) {
            validateBtn.addEventListener("click", async () => {
                validateBtn.disabled = true;
                await validateData();
                validateBtn.disabled = false;
            });
        } else {
            console.error("Validate button not found in DOM.");
        }
    }

    // رندر HTML
    document.body.innerHTML = html; // جایگزینی محتوای فعلی با HTML جدید

    // اجرای تابع‌ها بلافاصله بعد از رندر
    fetchBalance();
    validateData();
    setupEventListeners();

    return html;
}
