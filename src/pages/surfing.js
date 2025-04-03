// تابع اصلی رندر صفحه
export function render() {
    let content = "<p>Loading ads...</p>";

    // تابع برای باز کردن لینک درون مینی‌اپ تلگرام
    const openInMiniApp = (adId, url, duration, tokens) => {
        if (window.Telegram?.WebApp) {
            // ساخت URL برای صفحه نمایش آگهی
            const surfUrl = new URL('https://yourdomain.com/surf-ad');
            surfUrl.searchParams.set('id', adId);
            surfUrl.searchParams.set('url', encodeURIComponent(url));
            surfUrl.searchParams.set('duration', duration);
            surfUrl.searchParams.set('tokens', tokens);
            
            // باز کردن لینک درون مینی‌اپ
            window.Telegram.WebApp.openTelegramLink(surfUrl.toString());
        } else {
            // Fallback برای مرورگرهای معمولی
            window.open(`/surf-ad?id=${adId}&url=${encodeURIComponent(url)}&duration=${duration}&tokens=${tokens}`, '_blank');
        }
    };

    // دریافت آگهی‌ها از سرور
    fetch("https://coin-surf.sbs/0/get_ads.php")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                content = data.ads.map(ad => `
                    <div class="ad-section">
                        <p>Ad #${ad.id}: Visit ${ad.url} (+${ad.views} tokens)</p>
                        <button 
                            class="claim-btn"
                            onclick="(${openInMiniApp.toString()})(${ad.id}, '${ad.url.replace(/'/g, "\\'")}', 21, ${ad.views})"
                        >
                            Claim
                        </button>
                    </div>
                `).join("");
            } else {
                content = `<p>Error: ${data.error}</p>`;
            }
            document.querySelector(".surfing-page").innerHTML = content;
        })
        .catch(error => {
            console.error("Error loading ads:", error);
            document.querySelector(".surfing-page").innerHTML = "<p>Failed to load ads. Please try again.</p>";
        });

    return `
        <div class="surfing-page">
            <h2>Surf Ads</h2>
            <p>Visit websites to earn tokens</p>
            <div id="ads-container">${content}</div>
        </div>
    `;
}
