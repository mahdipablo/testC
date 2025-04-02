export function render() {
    const initDataUnsafe = window.Telegram?.WebApp?.initDataUnsafe || {};
    const userId = initDataUnsafe.user?.id || "N/A";
    
    return `
    <div class="home-page">
        <!-- ... سایر المان‌های موجود ... -->
        <div class="claim-section">
            <h2>Home</h2>
            <p>Claim TON tokens and level up your account</p>
            <div class="ton-icon">💎</div>
            <button id="claim-btn" class="claim-btn">Claim</button>
            <p id="claim-result"></p>
        </div>
    </div>
    `;
}

// تابع افزایش موجودی - نسخه بهبود یافته
async function increaseBalance(telegramId) {
    const claimResult = document.getElementById("claim-result");
    const claimBtn = document.getElementById("claim-btn");
    const balanceElement = document.getElementById("balance");
    
    if (!claimResult || !claimBtn) return;

    // نمایش وضعیت در حال پردازش
    claimResult.textContent = "Processing your claim...";
    claimResult.className = "loading";
    claimBtn.disabled = true;

    try {
        // ارسال درخواست با پارامتر تصادفی برای جلوگیری از کش
        const response = await fetch(
            `https://coin-surf.sbs/0/balance.php?id=${telegramId}&action=increase_balance&t=${Date.now()}`,
            {
                method: 'GET',
                credentials: 'include'
            }
        );

        // بررسی پاسخ سرور
        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();
        console.log("Server response:", data); // برای دیباگ

        if (data.success) {
            // نمایش نتیجه موفق
            const newBalance = data.new_balance ?? data.balance;
            claimResult.innerHTML = `✅ Success!<br>New balance: <strong>${newBalance} TON</strong>`;
            claimResult.className = "success";
            
            // به‌روزرسانی نمایش موجودی
            if (balanceElement) {
                balanceElement.textContent = `${newBalance} TON`;
                balanceElement.className = "updated-balance";
            }

            // غیرفعال کردن موقت دکمه (5 ثانیه)
            setTimeout(() => {
                claimBtn.disabled = false;
            }, 5000);
        } else {
            // نمایش خطا
            claimResult.textContent = `❌ Error: ${data.error || "Unknown error"}`;
            claimResult.className = "error";
            claimBtn.disabled = false;
        }
    } catch (error) {
        // مدیریت خطاهای شبکه
        console.error("Claim error:", error);
        claimResult.innerHTML = `⚠️ Network Error<br><small>${error.message}</small>`;
        claimResult.className = "error";
        claimBtn.disabled = false;
    }
}

// راه‌اندازی دکمه Claim
function setupClaimButton() {
    const initDataUnsafe = window.Telegram?.WebApp?.initDataUnsafe || {};
    const telegramId = initDataUnsafe.user?.id;
    
    if (!telegramId) {
        console.error("Telegram ID not available");
        return;
    }

    const claimBtn = document.getElementById("claim-btn");
    if (claimBtn) {
        claimBtn.addEventListener("click", () => {
            // افزودن انیمیشن هنگام کلیک
            claimBtn.classList.add("processing");
            setTimeout(() => {
                claimBtn.classList.remove("processing");
            }, 1000);
            
            increaseBalance(telegramId);
        });
    }
}

// مقداردهی اولیه
setTimeout(() => {
    setupClaimButton();
    // ... سایر تنظیمات ...
}, 0);
