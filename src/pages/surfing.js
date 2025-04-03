export function render() {
    let content = "<p>Loading ads...</p>";

    // تابع برای باز کردن لینک در مینی‌اپ
    const openSurfAd = (adId, url, duration, tokens) => {
        try {
            const telegramId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
            if (!telegramId) {
                console.error("Telegram ID not found");
                return;
            }

            const surfUrl = `/surf-ad?id=${adId}&url=${encodeURIComponent(url)}&duration=${duration}&tokens=${tokens}&telegram_id=${telegramId}`;
            
            if (window.Telegram?.WebApp?.openTelegramLink) {
                window.Telegram.WebApp.openTelegramLink(surfUrl);
            } else {
                window.open(surfUrl, '_blank');
            }
        } catch (error) {
            console.error("Error opening ad:", error);
        }
    };

    // دریافت آگهی‌ها
    fetch("https://coin-surf.sbs/0/get_ads.php")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                content = data.ads.map(ad => `
                    <div class="ad-section">
                        <p>Ad #${ad.id}: Visit ${ad.url} (+${ad.views} tokens)</p>
                        <button class="claim-btn" onclick="(function() {
                            const openFn = ${openSurfAd.toString()};
                            openFn(${ad.id}, '${ad.url.replace(/'/g, "\\'")}', 21, ${ad.views});
                        })()">
                            Claim
                        </button>
                    </div>
                `).join("");
            }
            document.querySelector(".surfing-page").innerHTML = content;
        })
        .catch(error => {
            console.error("Error:", error);
            document.querySelector(".surfing-page").innerHTML = "<p>Error loading ads</p>";
        });

    return `
        <div class="surfing-page">
            <h2>Surfing</h2>
            <p>Surf websites to earn tokens</p>
            <div id="ads-container">${content}</div>
        </div>
    `;
}
