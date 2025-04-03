export function render() {
    // نمایش پیام لودینگ اولیه
    let content = "<p>Loading ads...</p>";

    // تابع برای دریافت telegram_id از تلگرام
    const getTelegramId = () => {
        if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
            return window.Telegram.WebApp.initDataUnsafe.user.id;
        }
        return null;
    };

    // تابع برای باز کردن لینک در مینی‌اپ تلگرام
    const openInTelegram = (ad) => {
        const telegramId = getTelegramId();
        if (!telegramId) {
            alert("لطفاً از طریق تلگرام وارد شوید");
            return;
        }

        const surfUrl = `/surf-ad?id=${ad.id}&url=${encodeURIComponent(ad.url)}&duration=21&tokens=${ad.views}&telegram_id=${telegramId}`;
        
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.openTelegramLink(surfUrl);
        } else {
            window.open(surfUrl, '_blank');
        }
    };

    // دریافت داده‌ها از API
    fetch("https://coin-surf.sbs/0/get_ads.php")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const ads = data.ads;
                if (ads.length > 0) {
                    content = ads.map(ad => `
                        <div class="ad-section">
                            <p>Ad #${ad.id}: Visit ${ad.url} (+${ad.views} tokens)</p>
                            <button class="claim-btn" onclick="(${openInTelegram.toString()})(${JSON.stringify(ad)})">
                                Claim
                            </button>
                        </div>
                    `).join("");
                } else {
                    content = "<p>No ads available.</p>";
                }
            } else {
                content = `<p>Error loading ads: ${data.error}</p>`;
            }

            // نمایش داده‌ها در صفحه
            document.querySelector(".surfing-page").innerHTML = content;
        })
        .catch(error => {
            console.error("Error fetching ads:", error);
            document.querySelector(".surfing-page").innerHTML = "<p>Failed to load ads.</p>";
        });

    return `
      <div class="surfing-page">
        <h2>Surfing</h2>
        <p>Surf websites to earn tokens.</p>
        <div id="ads-container">${content}</div>
      </div>
    `;
}
