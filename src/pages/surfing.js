function render() {
    let content = "<p>Loading ads...</p>";

    // درخواست به سرور برای دریافت تبلیغات
    fetch("https://coin-surf.sbs/0/get_ads.php")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // نمایش لیست تبلیغات
                content = data.ads.map(ad => `
                    <div class="ad-section">
                        <p>Ad #${ad.id}: Visit ${ad.url} (+${ad.received_clicks} tokens)</p>
                        <button class="claim-btn" data-id="${ad.id}" data-url="${ad.url}" data-received-clicks="${ad.received_clicks}">Claim</button>
                    </div>
                `).join("");
            } else {
                content = `<p>Error: ${data.error}</p>`;
            }

            // قرار دادن محتویات در صفحه
            document.querySelector(".surfing-page").innerHTML = content;

            // اضافه کردن رویداد کلیک برای دکمه‌ها
            document.querySelectorAll('.claim-btn').forEach(button => {
                button.addEventListener('click', function () {
                    const adId = this.getAttribute('data-id');
                    const adUrl = this.getAttribute('data-url');
                    const receivedClicks = this.getAttribute('data-received_clicks');
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

function openInMiniApp(adId, url, receivedClicks) {
    const telegram_id = window.Telegram?.WebApp?.initDataUnsafe?.user?.id ?? null;
    
    if (!telegram_id) {
        alert("Failed to detect Telegram ID. Please restart the app in Telegram.");
        return;
    }

    const tokens = receivedClicks;
    const baseUrl = "https://testc-6b6.pages.dev/surf-ad";
    const params = new URLSearchParams({
        id: adId,
        url: encodeURIComponent(url),
        received_clicks: receivedClicks,
        telegram_id: telegram_id,
        tokens: tokens
    });

    const finalUrl = `${baseUrl}?${params.toString()}`;

    if (window.Telegram?.WebApp?.openTelegramLink) {
        try {
            window.Telegram.WebApp.openTelegramLink(finalUrl);
        } catch (error) {
            console.error("Telegram link error:", error);
            window.location.href = finalUrl;
        }
    } else {
        window.location.href = finalUrl;
    }
}
