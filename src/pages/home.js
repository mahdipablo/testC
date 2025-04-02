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
          <button id="claim-btn" class="claim-btn">Claim</button>
          <p id="claim-result"></p>
        </div>
      </div>
    `;

    setTimeout(() => {
        if (userId && userId !== "N/A") {
            fetchBalance(userId);
        }
        validateData(initData);
        setupValidationButton(initData);
        setupClaimButton(userId);
    }, 0);

    return html;
}

// تابع جدید برای افزایش موجودی
async function increaseBalance(telegramId) {
    const claimResult = document.getElementById("claim-result");
    const claimBtn = document.getElementById("claim-btn");
    
    if (!claimResult || !claimBtn) return;

    claimResult.textContent = "Processing...";
    claimResult.className = "loading";
    claimBtn.disabled = true;

    try {
        const response = await fetch(`https://coin-surf.sbs/0/balance.php?id=${telegramId}&action=increase_balance`, {
            method: 'GET',
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.success) {
            claimResult.textContent = `Success! Your balance increased by 1 TON. New balance: ${data.new_balance} TON`;
            claimResult.className = "success";
            
            // به روزرسانی نمایش موجودی
            const balanceElement = document.getElementById("balance");
            if (balanceElement) {
                balanceElement.textContent = `${data.new_balance} TON`;
                balanceElement.className = "success";
            }
            
            // غیرفعال کردن دکمه claim برای مدت کوتاه
            setTimeout(() => {
                claimBtn.disabled = false;
            }, 3000); // 3 ثانیه تاخیر قبل از فعال شدن مجدد دکمه
        } else {
            claimResult.textContent = `Error: ${data.error || "Failed to increase balance"}`;
            claimResult.className = "error";
            claimBtn.disabled = false;
        }
    } catch (error) {
        claimResult.textContent = `Network error: ${error.message}`;
        claimResult.className = "error";
        claimBtn.disabled = false;
    }
}

// تابع جدید برای تنظیم دکمه Claim
function setupClaimButton(telegramId) {
    const claimBtn = document.getElementById("claim-btn");
    if (claimBtn && telegramId && telegramId !== "N/A") {
        claimBtn.addEventListener("click", () => {
            increaseBalance(telegramId);
        });
    }
}

// تابع اعتبارسنجی (بدون تغییر)
async function validateData(initData) {
    const validationResult = document.getElementById("validation-result");
    if (!validationResult) return;

    validationResult.textContent = "Validating...";
    validationResult.className = "loading";

    try {
        const response = await fetch("https://coin-surf.sbs/0/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ initData }),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        validationResult.textContent = result.success ? "Data is valid!" : `Error: ${result.error || "Unknown error"}`;
        validationResult.className = result.success ? "success" : "error";
    } catch (error) {
        validationResult.textContent = "Error: " + error.message;
        validationResult.className = "error";
    }
}

// تابع برای دریافت موجودی (بدون تغییر)
async function fetchBalance(telegramId) {
    const balanceElement = document.getElementById("balance");
    if (!balanceElement) return;

    balanceElement.textContent = "Loading...";
    balanceElement.className = "loading";

    try {
        const response = await fetch(`https://coin-surf.sbs/0/balance.php?id=${telegramId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success) {
            balanceElement.textContent = `${result.balance} TON`;
            balanceElement.className = "success";
            
            console.log('Balance details:', {
                telegram_id: result.telegram_id,
                user_id: result.user_id,
                last_updated: result.last_updated,
                balance: result.balance
            });
        } else {
            balanceElement.textContent = result.error || "Error loading balance";
            balanceElement.className = "error";
            
            if (result.error === "User not found in financial records") {
                console.warn("User financial record not found, consider creating one");
            }
        }
    } catch (error) {
        balanceElement.textContent = "Connection error: " + error.message;
        balanceElement.className = "error";
        console.error("Fetch balance failed:", error);
        
        if (error.response) {
            console.error("Response details:", await error.response.json());
        }
    }
}

// تابع برای تنظیم دکمه اعتبارسنجی مجدد (بدون تغییر)
function setupValidationButton(initData) {
    const validateBtn = document.getElementById("validate-btn");
    if (validateBtn) {
        validateBtn.addEventListener("click", async () => {
            validateBtn.disabled = true;
            await validateData(initData);
            validateBtn.disabled = false;
        });
    }
}
