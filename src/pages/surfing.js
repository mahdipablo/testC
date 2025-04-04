export function render() {
    let content = "<p>Loading ads...</p>";

    // دریافت تبلیغات از سرور
    fetch("https://coin-surf.sbs/0/get_ads.php")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                content = data.ads.map(ad => {
                    const tokenAmount = (parseFloat(ad.received_clicks) * 0.00010).toFixed(5);
                    return `
                        <div class="ad-section">
                            <p>Ad #${ad.id}: Visit ${ad.url} (+${tokenAmount} tokens)</p>
                            <button class="claim-btn" 
                                data-id="${ad.id}" 
                                data-url="${encodeURIComponent(ad.url)}" 
                                data-received-clicks="${ad.received_clicks}">
                                Claim
                            </button>
                        </div>
                    `;
                }).join("");
            } else {
                content = `<p>Error: ${data.error}</p>`;
            }

            document.querySelector(".surfing-page").innerHTML = content;

            // اضافه‌کردن رویداد کلیک
            document.querySelectorAll('.claim-btn').forEach(button => {
                button.addEventListener('click', function () {
                    const adId = this.getAttribute('data-id');
                    const encodedUrl = this.getAttribute('data-url');
                    const receivedClicks = this.getAttribute('data-received-clicks');

                    openInMiniApp(adId, encodedUrl, receivedClicks);
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

function openInMiniApp(adId, encodedUrl, receivedClicks) {
    const telegram_id = window.Telegram?.WebApp?.initDataUnsafe?.user?.id ?? null;

    if (!telegram_id) {
        alert("Failed to detect Telegram ID. Please restart the app in Telegram.");
        return;
    }

    const tokens = (parseFloat(receivedClicks) * 0.00010).toFixed(5);
    const baseUrl = "https://testc-6b6.pages.dev/surf-ad";

    const finalUrl = `${baseUrl}?id=${adId}&url=${encodedUrl}&views=${receivedClicks}&telegram_id=${telegram_id}&tokens=${tokens}`;

    // باز کردن صفحه در Mini App
    window.Telegram.WebApp.openTelegramLink(finalUrl);
}
