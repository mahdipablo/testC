export function render() {
    let content = "<p>Loading ads...</p>";

    fetch("https://coin-surf.sbs/0/get_ads.php")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const ads = data.ads;
                if (ads.length > 0) {
                    content = ads.map(ad => `
                        <div class="ad-section">
                            <p>Ad #${ad.id}: Visit ${ad.url} (+${ad.views} tokens)</p>
                            <a href="ad-view.html?id=${ad.id}&url=${encodeURIComponent(ad.url)}&views=${ad.views}" target="_blank" class="claim-btn">Claim</a>
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
