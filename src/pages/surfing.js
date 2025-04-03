export function render() {
    let content = "<p>Loading ads...</p>";

    fetch("https://coin-surf.sbs/0/get_ads.php")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                content = data.ads.map(ad => `
                    <div class="ad-section">
                        <p>Ad #${ad.id}: Visit ${ad.url} (+${ad.views} tokens)</p>
                        <button class="claim-btn" data-id="${ad.id}" data-url="${ad.url}" data-views="${ad.views}">Claim</button>
                    </div>
                `).join("");
            } else {
                content = `<p>Error: ${data.error}</p>`;
            }

            document.querySelector(".surfing-page").innerHTML = content;

            document.querySelectorAll('.claim-btn').forEach(button => {
                button.addEventListener('click', function () {
                    const adId = this.getAttribute('data-id');
                    const adUrl = this.getAttribute('data-url');
                    const views = this.getAttribute('data-views');
                    openInMiniApp(adId, adUrl, views);
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

function openInMiniApp(adId, url, views) {
    const telegram_id = window.Telegram?.WebApp.initDataUnsafe?.user?.id;

    if (!telegram_id) {
        console.error("❌ Telegram ID is missing!");
        return;
    }

    const tokens = parseFloat(views); // تبدیل به عدد
    console.log("📤 Sending Data:", { telegram_id, tokens });

    fetch("https://testc-6b6.pages.dev/surf-ad.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telegram_id, tokens })
    })
    .then(response => response.json())
    .then(data => {
        console.log("✅ Server Response:", data);
        if (data.success) {
            alert("🎉 Balance updated successfully!");
        } else {
            alert("⚠️ Error: " + data.error);
        }
    })
    .catch(error => console.error("❌ Request failed:", error));
}
