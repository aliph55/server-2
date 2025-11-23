// server.js - AdMob Backend Server
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// CORS ayarları (farklı domainlerden erişim için)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// ==========================================
// APP-ADS.TXT ROUTE (EN ÖNEMLİ!)
// ==========================================
app.get("/app-ads.txt", (req, res) => {
  res.type("text/plain");
  res.send("google.com, pub-6721519204185712, DIRECT, f08c47fec0942fa0");
});

// ==========================================
// ANA SAYFA
// ==========================================
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google-adsense-account" content="ca-pub-6721519204185712">
    <title>ZenAi - AdMob Developer Website</title>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6721519204185712"
     crossorigin="anonymous"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        h1 {
            color: #667eea;
            text-align: center;
            font-size: 2.5em;
            margin-bottom: 20px;
        }
        .status {
            background: #e8f5e9;
            border-left: 4px solid #4caf50;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .info-box {
            background: #f5f5f5;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
        .info-box h3 {
            color: #667eea;
            margin-bottom: 10px;
        }
        .code-block {
            background: #2d2d2d;
            color: #fff;
            padding: 15px;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
            overflow-x: auto;
            margin: 10px 0;
        }
        .button {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 5px;
            transition: all 0.3s;
        }
        .button:hover {
            background: #5568d3;
            transform: translateY(-2px);
        }
        .ad-container {
            background: #f9f9f9;
            border: 2px dashed #ddd;
            padding: 40px;
            text-align: center;
            margin: 20px 0;
            border-radius: 10px;
            color: #999;
        }
        footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 ZenAi Developer Website</h1>
        
        <div class="status">
            <strong>✅ app-ads.txt Aktif!</strong><br>
            AdMob doğrulama dosyası başarıyla yayında.
        </div>

        <div class="info-box">
            <h3>📋 Publisher Bilgileri</h3>
            <p><strong>Publisher ID:</strong> pub-6721519204185712</p>
            <p><strong>Platform:</strong> Google AdMob</p>
            <p><strong>App Name:</strong> ZenAi (Android)</p>
        </div>

        <div class="ad-container">
            📢 Reklam Alanı<br>
            AdMob Banner (320x50 veya Responsive)
        </div>

        <div class="info-box">
            <h3>🔧 Doğrulama Adımları</h3>
            <ol style="margin-left: 20px; line-height: 2;">
                <li>app-ads.txt dosyasını kontrol et: <a href="/app-ads.txt" target="_blank">/app-ads.txt</a></li>
                <li>Google Play Console'da bu domain'i ekle</li>
                <li>AdMob'da "Check for updates" butonuna tıkla</li>
                <li>Doğrulama tamamlanana kadar bekle (birkaç saat sürebilir)</li>
            </ol>
        </div>

        <div class="info-box">
            <h3>📱 Uygulama Hakkında</h3>
            <p>ZenAi, kullanıcılarına üretkenlik ve yaratıcılık konusunda yardımcı olan modern bir mobil uygulamadır.</p>
        </div>

        <div class="ad-container">
            📢 Reklam Alanı<br>
            AdMob Medium Rectangle (300x250)
        </div>

        <div style="text-align: center; margin: 30px 0;">
            <a href="/app-ads.txt" class="button">app-ads.txt Görüntüle</a>
            <a href="/api/status" class="button">Server Status</a>
        </div>

        <footer>
            <p>&copy; 2024 ZenAi. Tüm hakları saklıdır.</p>
            <p style="font-size: 12px; margin-top: 10px;">Powered by Node.js + Express</p>
        </footer>
    </div>
</body>
</html>
    `);
});

// ==========================================
// API ROUTES
// ==========================================

// Server durumu kontrolü
app.get("/api/status", (req, res) => {
  res.json({
    status: "online",
    timestamp: new Date().toISOString(),
    publisher_id: "pub-6721519204185712",
    app_ads_txt_active: true,
    server: "Node.js + Express",
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send(`
        <h1>404 - Sayfa Bulunamadı</h1>
        <p><a href="/">Ana Sayfaya Dön</a></p>
    `);
});

// Server'ı başlat
app.listen(PORT, () => {
  console.log(`
    ╔════════════════════════════════════════╗
    ║   🚀 AdMob Server Çalışıyor!          ║
    ╠════════════════════════════════════════╣
    ║   Port: ${PORT}                        ║
    ║   URL: http://localhost:${PORT}        ║
    ║   app-ads.txt: /app-ads.txt           ║
    ╚════════════════════════════════════════╝
    `);
  console.log(
    `✅ app-ads.txt erişilebilir: http://localhost:${PORT}/app-ads.txt`
  );
  console.log(`✅ API Status: http://localhost:${PORT}/api/status`);
});

module.exports = app;
