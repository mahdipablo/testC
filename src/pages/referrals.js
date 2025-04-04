export function render() {
  return `
    <div class="referrals-page">
      <div class="header">
        <button class="back-button" onclick="goBack()">Back</button>
        <span class="header-title">Coin Surf</span>
      </div>
      <h2>Referrals</h2>
      <p>Invite friends and earn bonuses.</p>
      <p>Your referral link: <a href="#">https://example.com/ref/34992</a></p>
    </div>
    <script>
      function goBack() {
        window.history.back(); // بازگشت به صفحه قبلی
      }
    </script>
    <style>
      body {
        margin: 0;
        font-family: Arial, sans-serif;
        background-color: #1a2a44;
        color: #fff;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #0d1b2a;
        padding: 10px 20px;
        border-bottom: 2px solid #00aaff;
      }
      .header-title {
        font-size: 20px;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      }
      .back-button {
        background-color: #1b263b;
        color: #fff;
        border: none;
        padding: 8px 16px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
      }
      .back-button:hover {
        background-color: #00aaff;
      }
    </style>
  `;
}
