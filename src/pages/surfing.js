export function render() {
    let content = "<p>Loading ads...</p>";

    fetch("https://coin-surf.sbs/0/get_ads.php")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                content = data.ads.map(ad => `
                    <div class="ad-section">
                        <p>Ad #${ad.id}: Visit <a href="${ad.url}" target="_blank">${ad.url}</a> (+${ad.received_clicks} tokens)</p>
                        <button class="claim-btn" data-id="${ad.id}" data-url="${ad.url}" data-received-clicks="${ad.received_clicks}">Claim</button>
                    </div>
                `).join("");
            } else {
                content = `<p>Error: ${data.error}</p>`;
            }

            document.querySelector(".surfing-page").innerHTML = content;

            document.querySelectorAll('.claim-btn').forEach(button => {
                button.addEventListener('click', function () {
                    const adId = this.getAttribute('data-id');
                    const adUrl = decodeURIComponent(this.getAttribute('data-url')); // جلوگیری از دوبار انکد شدن
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

function openInMiniApp(adId, url, receivedClicks) {
    const telegram_id = window.Telegram?.WebApp?.initDataUnsafe?.user?.id ?? null;

    if (!telegram_id) {
        alert("Failed to detect Telegram ID. Please restart the app in Telegram.");
        return;
    }

    // ایجاد لینک معتبر بدون دوبار انکد شدن
    const baseUrl = "https://testc-6b6.pages.dev/surf-ad";
    const params = new URLSearchParams({
        id: adId,
        url: url, // دیگر نیازی به `encodeURIComponent()` نیست
        views: receivedClicks,
        telegram_id: telegram_id,
        tokens: receivedClicks
    });

    const finalUrl = `${baseUrl}?${params.toString()}`;

    console.log("Opening URL:", finalUrl);

    window.Telegram.WebApp.openLink(finalUrl);

    // افزودن دکمه بستن برای برگشت
    setTimeout(() => {
        showCloseButton();
    }, 5000);
}

// تابع نمایش دکمه بستن
function showCloseButton() {
    const closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.style.position = "fixed";
    closeButton.style.bottom = "20px";
    closeButton.style.right = "20px";
    closeButton.style.padding = "10px";
    closeButton.style.background = "#f00";
    closeButton.style.color = "#fff";
    closeButton.style.border = "none";
    closeButton.style.cursor = "pointer";

    closeButton.addEventListener("click", () => {
        window.Telegram.WebApp.close();
    });

    document.body.appendChild(closeButton);
}
