// Ana JavaScript dosyası - Sayfa başlatma ve genel yönetim
document.addEventListener('DOMContentLoaded', function() {
    console.log("Analiz ekranı yüklendi!");
    
    // Grafiklerin global ayarları
    Chart.defaults.font.family = 'Inter';
    Chart.defaults.plugins.legend.position = 'bottom';
    
    // Grafikleri oluştur
    initCharts();
    
    // Haritayı başlat
    initMap();
});
