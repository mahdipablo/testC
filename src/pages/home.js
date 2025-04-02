export function render() {
    // دریافت داده‌های کاربر از تلگرام
    const initDataUnsafe = window.Telegram?.WebApp?.initDataUnsafe || {};
    const first_name = initDataUnsafe.user?.first_name || "Unknown";
    const userId = initDataUnsafe.user?.id || "N/A";
    const initData = window.Telegram?.WebApp?.initData || "";

    // HTML اولیه
    const html = `
      <div class="home-page">
        <!-- ... کد HTML قبلی بدون تغییر ... -->
      </div>
    `;

    setTimeout(() => {
        if (userId && userId !== "N/A") {
            fetchBalance(userId); // ارسال userId که در واقع telegram_id است
        }
        validateData(initData);
        setupValidationButton(initData);
    }, 0);

    return html;
}

// تابع اعتبارسنجی (بدون تغییر)
async function validateData(initData) {
    // ... کد قبلی بدون تغییر ...
}

// تابع جدید برای دریافت موجودی
async function fetchBalance(telegramId) {
    const balanceElement = document.getElementById("balance");
    if (!balanceElement) return;

    balanceElement.textContent = "Loading...";
    balanceElement.className = "loading";

    try {
        // اضافه کردن timestamp برای جلوگیری از کش
        const timestamp = Date.now();
        const response = await fetch(`https://coin-surf.sbs/balance.php?id=${telegramId}&_=${timestamp}`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success) {
            balanceElement.textContent = `${parseFloat(result.balance).toFixed(8)} BTC`;
            balanceElement.className = "success";
        } else {
            balanceElement.textContent = result.error || "Error loading balance";
            balanceElement.className = "error";
        }
    } catch (error) {
        balanceElement.textContent = "Failed to load balance. Please try again.";
        balanceElement.className = "error";
        console.error("Fetch error:", error);
    }
}

// تابع برای تنظیم دکمه اعتبارسنجی مجدد (بدون تغییر)
function setupValidationButton(initData) {
    // ... کد قبلی بدون تغییر ...
}
