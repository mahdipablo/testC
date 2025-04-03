// تعریف تابع در سطح عمومی
window.openSurfAd = (adId, url, duration, tokens) => {
    if (window.Telegram && window.Telegram.WebApp) {
        const surfAdPage = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Surf Ad</title>
                <style>
                    /* استایل‌ها همانند قبل */
                </style>
            </head>
            <body>
                <div class="timer-container">
                    Time remaining: <span id="timer">${duration}</span> sec
                </div>
                <div class="iframe-container">
                    <iframe src="${url}"></iframe>
                </div>
                <div id="success-message" class="success-message">
                    ${tokens} tokens added to your balance!
                </div>
                <script>
                    // تایمر و ارسال داده همانند قبل
                </script>
            </body>
            </html>
        `;
        window.Telegram.WebApp.openTelegramLink(`https://yourdomain.com/surf-ad?id=${adId}&url=${encodeURIComponent(url)}&duration=${duration}&tokens=${tokens}`);
    } else {
        window.open(`/surf-ad?id=${adId}&url=${encodeURIComponent(url)}&duration=${duration}&tokens=${tokens}`, '_blank');
    }
};

export function render() {
    let content = "<p>Loading ads...</p>";

    fetch("https://coin-surf.sbs/0/get_ads.php")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                content = data.ads.map(ad => `
                    <div class="ad-section">
                        <p>Ad #${ad.id}: Visit ${ad.url} (+${ad.views} tokens)</p>
                        <button 
                            class="claim-btn" 
                            onclick="openSurfAd(${ad.id}, '${encodeURIComponent(ad.url)}', 21, ${ad.views})"
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
