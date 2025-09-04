# Kamunun Nabzı: Sosyal Medya Hassasiyet Haritası

Bu proje, bakanlıkların ve kamu kurumlarının toplumsal eğilimleri anlamalarına yardımcı olmak amacıyla geliştirilmiş, sosyal medya verilerini coğrafi ve duygu bazlı analiz eden interaktif bir web uygulamasıdır. "Kamunun Nabzı," belirli gündemler ve konular hakkındaki halkın genel duygu durumunu harita üzerinde görselleştirerek politika geliştirme süreçlerine anlık ve veri odaklı bir bakış açısı sunar.

## ✨ Temel Özellikler

- **İnteraktif Türkiye Haritası:** Sosyal medya paylaşımlarını şehir bazında, duygu durumlarına göre (pozitif, negatif, nötr) renklendirilmiş olarak gösterir.
- **Dinamik Filtreleme:** Kullanıcıların belirli gündemleri (hashtag) seçerek sadece o konuyla ilgili veri noktalarını haritada görmelerini sağlar.
- **AI Destekli Analiz:** Google Gemini entegrasyonu sayesinde, seçilen gündemle ilgili sosyal medya paylaşımlarından anında özetler, öne çıkan konular ve bakanlıklar için eyleme geçirilebilir politika önerileri üretir.
- **Veri Görselleştirme:** Duygu durumlarını belirten renk kodları ve harita üzerindeki gösterim (legend) ile verilerin kolayca anlaşılmasını sağlar.

## 🛠️ Kullanılan Teknolojiler

- **Arayüz (Frontend):** HTML5, CSS3, JavaScript
- **Harita Kütüphanesi:** [Leaflet.js](https://leafletjs.com/) - Açık kaynaklı, interaktif haritalar için güçlü bir kütüphane.
- **Yapay Zeka (AI):** [Google Gemini API](https://ai.google.dev/) - Metin analizi ve özetleme için.

## 🚀 Gelecek Vizyonu ve Potansiyel Geliştirmeler

Bu proje, şu anki haliyle bir prototip olup, doğru entegrasyonlarla Türkiye'nin en kapsamlı sosyal ve ekonomik öngörü platformlarından birine dönüşme potansiyeline sahiptir.

### 1. Gerçek Zamanlı Veri Entegrasyonu

Projenin bir sonraki adımı, sahte veriler yerine **Twitter, Facebook, Instagram ve diğer sosyal medya platformlarının API'ları** ile entegre olmaktır. Bu entegrasyon sayesinde:
- Analizler anlık ve gerçek zamanlı verilere dayanır.
- Kamuoyu tepkileri, krizler veya viral olan konular saniyeler içinde tespit edilebilir.
- Demografik (yaş, cinsiyet vb.) ve lokasyon bazlı çok daha hassas analizler yapılabilir.

### 2. Kapsamlı Bir Öngörü Platformu

Gerçek zamanlı veri akışı sağlandıktan sonra, bu platform sadece mevcut durumu analiz etmekle kalmaz, aynı zamanda geleceğe yönelik güçlü öngörülerde bulunabilen bir sisteme evrilebilir. Gelişmiş makine öğrenmesi modelleri ile zenginleştirilerek aşağıdaki gibi alanlarda inanılmaz bir potansiyel sunar:

- **Tüketici ve Seçmen Davranışları:**
  - Halkın **günlük online alışveriş tercihlerinin** hangi yönde evrildiği.
  - Yeni çıkan bir ürüne (örneğin **otomobil modellerine**) karşı halkın ilk tepkileri ve satın alma eğilimleri.
  - Belirli bir bölgedeki seçmenlerin en çok konuştuğu konular ve seçim sonuçlarına etki edebilecek hassasiyetler.

- **Ekonomik ve Sosyal Trendler:**
  - Toplumun ekonomik gidişat hakkındaki genel görüşü ve yatırım eğilimleri.
  - Yeni bir kanun veya düzenleme teklifine karşı oluşabilecek toplumsal tepkilerin önceden modellenmesi.
  - Turizm, gıda veya teknoloji gibi sektörlerdeki yükselen trendlerin anında yakalanması.

Kısacası, "Kamunun Nabzı" projesi, doğru yatırımlarla kamu yönetiminden pazar araştırmasına, sosyolojik analizlerden ekonomik öngörülere kadar her alanda kullanılabilecek stratejik bir karar destek sistemine dönüştürülebilir.

## 💻 Projeyi Yerel Makinede Çalıştırma

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1.  **Gerekli Paketleri Yükleyin:**
    ```bash
    npm install
    ```

2.  **Geliştirme Sunucusunu Başlatın:**
    ```bash
    npm run dev
    ```
    Bu komut, projeyi `http://localhost:5173` adresinde çalıştıracaktır.
