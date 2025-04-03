export async function render() {
    // دریافت داده‌ها از API
    let ads = [];
    try {
        const response = await fetch("https://coin-surf.sbs/0/get_ads.php");
        const data = await response.json();
        if (data.success) {
            ads = data.ads;
        } else {
            console.error("Failed to fetch ads:", data.error);
        }
    } catch (error) {
        console.error("Error fetching ads:", error);
    }

    // تولید لیست تبلیغات
    const adsList = ads.map(ad => `
        <div class="ad-item">
            <span>${ad.url}</span>
            <a href="${ad.url}" target="_blank" class="visit-btn">Visit</a>
        </div>
    `).join("");

    return `
      <div class="surfing-page">
        <h2>Surfing</h2>
        <p>Surf websites to earn tokens.</p>
        ${ads.length > 0 ? adsList : "<p>No ads available.</p>"}
      </div>
    `;
}
