export function render() {
    // دریافت داده‌های کاربر از تلگرام
    const initDataUnsafe = window.Telegram?.WebApp?.initDataUnsafe || {};
    const first_name = initDataUnsafe.user?.first_name || "Unknown";
    const userId = initDataUnsafe.user?.id || "N/A";
    const initData = window.Telegram?.WebApp?.initData || "";

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

// تابع اعتبارسنجی
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


// تابع برای دریافت موجودی بر اساس telegram_id
async function fetchBalance(telegramId) {
    const balanceElement = document.getElementById("balance");
    if (!balanceElement) return;

    // نمایش وضعیت در حال بارگذاری
    balanceElement.textContent = "Loading...";
    balanceElement.className = "loading";

    try {
        // ارسال درخواست به balance.php با telegram_id
        const response = await fetch(`https://coin-surf.sbs/balance.php?id=${telegramId}`);
        
        // بررسی وضعیت پاسخ
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        // پردازش پاسخ موفق
        if (result.success) {
            balanceElement.textContent = `${result.balance.toFixed(8)} BTC`;
            balanceElement.className = "success";
            
            // اطلاعات اضافی برای دیباگ (اختیاری)
            console.log('Balance details:', {
                telegram_id: result.telegram_id,
                user_id: result.user_id,
                last_updated: result.last_updated
            });
        } 
        // پردازش خطا
        else {
            balanceElement.textContent = result.error || "Error loading balance";
            balanceElement.className = "error";
            
            // پیشنهاد ایجاد حساب جدید اگر کاربر یافت نشد
            if (result.error === "User not found in financial records") {
                console.warn("User financial record not found, consider creating one");
                // میتوانید اینجا تابع ایجاد حساب جدید را فراخوانی کنید
            }
        }
    } catch (error) {
        // مدیریت خطاهای شبکه/سیستم
        balanceElement.textContent = "Connection error: " + error.message;
        balanceElement.className = "error";
        console.error("Fetch balance failed:", error);
        
        // نمایش اطلاعات بیشتر برای دیباگ
        if (error.response) {
            console.error("Response details:", await error.response.json());
        }
    }
}

// تابع برای تنظیم دکمه اعتبارسنجی مجدد
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
