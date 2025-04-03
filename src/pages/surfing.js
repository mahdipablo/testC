export function render() {
    let content = "<p>Loading ads...</p>";

    // درخواست به سرور برای دریافت تبلیغات
    fetch("https://coin-surf.sbs/0/get_ads.php")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // نمایش لیست تبلیغات
                content = data.ads.map(ad => {
                    const receivedClicks = parseFloat(ad.received_clicks); // تبدیل به عدد اعشاری
                    return `
                        <div class="ad-section">
                            <p>Ad #${ad.id}: Visit ${ad.url} (+${receivedClicks} tokens)</p>
                            <button class="claim-btn" data-id="${ad.id}" data-url="${ad.url}" data-received-clicks="${receivedClicks}">Claim</button>
                        </div>
                    `;
                }).join("");
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
                    const receivedClicks = parseFloat(this.getAttribute('data-received-clicks')); // تبدیل به عدد اعشاری
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
    // دریافت Telegram ID از Mini App
    const telegram_id = window.Telegram?.WebApp?.initDataUnsafe?.user?.id ?? null;
    
    if (!telegram_id) {
        alert("Failed to detect Telegram ID. Please restart the app in Telegram.");
        return;
    }

    // توکن‌ها بر اساس received_clicks محاسبه می‌شود
    const tokens = receivedClicks;
    const baseUrl = "https://testc-6b6.pages.dev/surf-ad";
    const params = new URLSearchParams({
        id: adId,
        url: encodeURIComponent(url),
        views: receivedClicks, // تغییر نام از views به receivedClicks
        telegram_id: telegram_id,
        tokens: tokens
    });

    const finalUrl = `${baseUrl}?${params.toString()}`;

    // باز کردن لینک در مینی اپ
    window.location.href = finalUrl;
}
