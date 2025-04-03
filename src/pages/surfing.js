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
        views: receivedClicks,  // تغییر نام از views به receivedClicks
        telegram_id: telegram_id,
        tokens: tokens
    });

    // بررسی URL نهایی برای اطمینان از درستی
    const finalUrl = `${baseUrl}?${params.toString()}`;
    console.log(finalUrl); // بررسی URL در کنسول

    // باز کردن لینک در مینی اپ
    window.location.href = finalUrl;
}
