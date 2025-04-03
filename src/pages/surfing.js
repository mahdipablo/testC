export function render() {
    // نمایش پیام لودینگ اولیه
    let content = "<p>Loading ads...</p>";

    // دریافت داده‌ها از API
    fetch("https://coin-surf.sbs/0/get_ads.php")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const ads = data.ads;
                if (ads.length > 0) {
                    content = ads.map(ad => `
                        <div class="ad-box">
                            <h3>Ad #${ad.id}</h3>
                            <p><strong>Website:</strong> ${ad.url}</p>
                            <p><strong>Views:</strong> ${ad.views} | <strong>Timer:</strong> ${ad.timer} sec</p>
                            <a href="${ad.url}" target="_blank" class="visit-btn">Visit</a>
                        </div>
                    `).join("");
                } else {
                    content = "<p>No ads available.</p>";
                }
            } else {
                content = `<p>Error loading ads: ${data.error}</p>`;
            }

            // نمایش داده‌ها در صفحه
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
