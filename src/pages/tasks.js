export function render() {
  return `
    <div class="tasks-page">
      <h2>Tasks</h2>
      <p>Complete tasks to earn more TON tokens.</p>
      <ul>
        <li>Task 1: Follow us on Telegram (+10 TON) <button>Claim</button></li>
        <li>Task 2: Share with a friend (+20 TON) <button>Claim</button></li>
        <li>Task 3: Subscribe to our YouTube channel (+100 TON) <button>Claim</button></li>
      </ul>

      <!-- تبلیغات Surfe.pro -->
      <div style="margin-top: 20px;">
        <script src="https://static.surfe.pro/js/net.js"></script>
        <ins class="surfe-be" data-sid="410772"></ins>
        <script>
          (adsurfebe = window.adsurfebe || []).push({});
        </script>
      </div>

      <div style="margin-top: 20px;">
        <ins class="surfe-be" data-sid="410773"></ins>
        <script>
          (adsurfebe = window.adsurfebe || []).push({});
        </script>
      </div>
    </div>
  `;
}
