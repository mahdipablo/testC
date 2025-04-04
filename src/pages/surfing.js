export function render() {
    let content = "<p>Loading ads...</p>";

    // دریافت تبلیغات از سرور
    fetch("https://coin-surf.sbs/0/get_ads.php")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                content = data.ads.map(ad => `
                    <div class="ad-section">
                        <p>Ad #${ad.id}: Visit ${ad.url} (+${ad.received_clicks} tokens)</p>
                        <button class="claim-btn" data-id="${ad.id}" data-url="${ad.url}" data-received-clicks="${ad.received_clicks}">Claim</button>
                    </div>
                `).join("");
            } else {
                content = `<p>Error: ${data.error}</p>`;
            }

            // نمایش تبلیغات در صفحه
            document.querySelector(".surfing-page").innerHTML = content;

            // افزودن رویداد کلیک به دکمه‌های Claim
            document.querySelectorAll('.claim-btn').forEach(button => {
                button.addEventListener('click', function () {
                    const adId = this.getAttribute('data-id');
                    const adUrl = this.getAttribute('data-url');
                    const receivedClicks = this.getAttribute('data-received-clicks');
                    openInMiniApp(adId, adUrl, receivedClicks);
                });
            });
        })
        .catch(error => {
            console.error("Error fetching ads:", error);
            document.querySelector(".surfing-page").innerHTML = "<p>Failed to load ads.</p>";
        });

    return `
        <div class="surfing-page">
            <h2>Surf Ads</h2>
            <p>Visit websites to earn tokens</p>
            <div id="ads-container">${content}</div>
        </div>
    `;
}

// تابع باز کردن تبلیغات در Mini App
function openInMiniApp(adId, url, receivedClicks) {
    const telegram_id = window.Telegram?.WebApp?.initDataUnsafe?.user?.id ?? null;

    if (!telegram_id) {
        alert("Failed to detect Telegram ID. Please restart the app in Telegram.");
        return;
    }

    // تبدیل لینک تبلیغاتی به یک لینک معتبر
    const baseUrl = "https://testc-6b6.pages.dev/surf-ad";
    const params = new URLSearchParams({
        id: adId,
        url: encodeURIComponent(url),
        views: receivedClicks,
        telegram_id: telegram_id,
        tokens: receivedClicks
    });

    const finalUrl = `${baseUrl}?${params.toString()}`;

    // نمایش لینک در کنسول برای دیباگ
    console.log("Opening URL:", finalUrl);

    // استفاده از openLink برای جلوگیری از خطای WebAppTgUrlInvalid
    window.Telegram.WebApp.openLink(finalUrl);
}
