export function render() {
    let content = "<p>Loading ads...</p>";

    // تابع برای نمایش صفحه Surf Ad
    const openSurfAd = (adId, url, duration, tokens) => {
        if (window.Telegram && window.Telegram.WebApp) {
            // ساخت محتوای صفحه Surf Ad به صورت داینامیک
            const surfAdPage = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Surf Ad</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            display: flex;
                            flex-direction: column;
                            height: 100vh;
                        }
                        .timer-container {
                            background: #f0f0f0;
                            padding: 10px;
                            text-align: center;
                            font-size: 18px;
                            font-weight: bold;
                        }
                        .iframe-container {
                            flex-grow: 1;
                            display: flex;
                        }
                        iframe {
                            flex-grow: 1;
                            border: none;
                        }
                        .success-message {
                            display: none;
                            text-align: center;
                            padding: 20px;
                            color: green;
                            font-size: 24px;
                            font-weight: bold;
                        }
                    </style>
                </head>
                <body>
                    <div class="timer-container">
                        Time remaining: <span id="timer">${duration}</span> sec
                    </div>
                    <div class="iframe-container">
                        <iframe id="ad-iframe" src="${url}"></iframe>
                    </div>
                    <div id="success-message" class="success-message">
                        ${tokens} tokens added to your balance!
                    </div>

                    <script>
                        let timeLeft = ${duration};
                        const timerElement = document.getElementById('timer');
                        const timerInterval = setInterval(() => {
                            timeLeft--;
                            timerElement.textContent = timeLeft;

                            if (timeLeft <= 0) {
                                clearInterval(timerInterval);
                                document.getElementById('success-message').style.display = 'block';
                                document.getElementById('ad-iframe').style.display = 'none';
                                
                                // ارسال پیام به مینی‌اپ اصلی برای به‌روزرسانی بالانس
                                if (window.Telegram && window.Telegram.WebApp) {
                                    window.Telegram.WebApp.sendData(JSON.stringify({
                                        action: 'add_tokens',
                                        tokens: ${tokens},
                                        adId: ${adId}
                                    }));
                                }
                            }
                        }, 1000);
                    </script>
                </body>
                </html>
            `;

            // باز کردن صفحه در یک پنجره جدید در همان مینی‌اپ
            window.Telegram.WebApp.openTelegramLink(`https://yourdomain.com/surf-ad?id=${adId}&url=${encodeURIComponent(url)}&duration=${duration}&tokens=${tokens}`);
        } else {
            // Fallback برای حالت عادی (اگر در محیط تلگرام نبود)
            window.open(`/surf-ad?id=${adId}&url=${encodeURIComponent(url)}&duration=${duration}&tokens=${tokens}`, '_blank');
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
                            <button 
                                class="claim-btn" 
                                onclick="(${openSurfAd.toString()})(${ad.id}, '${ad.url}', 21, ${ad.views})"
                            >
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
