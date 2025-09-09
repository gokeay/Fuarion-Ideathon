// Harita ile ilgili tüm fonksiyonlar ve işlemler

// Haritayı başlatan ana fonksiyon
function initMap() {
    // Türkiye Etkileşim Haritası (Leaflet)
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        console.log("Harita başlatılıyor...");
        
        // Sentiment (duygu) verileri
        const sentimentData = {
            "Adana": 0.55, "Adiyaman": 0.35, "Afyonkarahisar": 0.5, "Agri": 0.2,
            "Amasya": 0.6, "Ankara": 0.85, "Antalya": 0.65, "Artvin": 0.7,
            "Aydin": 0.75, "Balikesir": 0.7, "Bilecik": 0.65, "Bingol": 0.25,
            "Bitlis": 0.22, "Bolu": 0.68, "Burdur": 0.6, "Bursa": 0.72,
            "Canakkale": 0.8, "Cankiri": 0.4, "Corum": 0.45, "Denizli": 0.7,
            "Diyarbakir": 0.32, "Edirne": 0.82, "Elazig": 0.4, "Erzincan": 0.42,
            "Erzurum": 0.45, "Eskisehir": 0.81, "Gaziantep": 0.51, "Giresun": 0.72,
            "Gumushane": 0.5, "Hakkari": 0.1, "Hatay": 0.6, "Isparta": 0.55,
            "Mersin": 0.62, "Istanbul": 0.92, "Izmir": 0.78, "Kars": 0.3,
            "Kastamonu": 0.48, "Kayseri": 0.58, "Kirklareli": 0.77, "Kirsehir": 0.5,
            "Kocaeli": 0.73, "Konya": 0.40, "Kutahya": 0.52, "Malatya": 0.48,
            "Manisa": 0.68, "Kahramanmaras": 0.53, "Mardin": 0.33, "Mugla": 0.79,
            "Mus": 0.28, "Nevsehir": 0.65, "Nigde": 0.45, "Ordu": 0.75,
            "Rize": 0.8, "Sakarya": 0.69, "Samsun": 0.68, "Siirt": 0.25,
            "Sinop": 0.7, "Sivas": 0.4, "Tekirdag": 0.78, "Tokat": 0.5,
            "Trabzon": 0.88, "Tunceli": 0.55, "Sanliurfa": 0.3, "Usak": 0.58,
            "Van": 0.29, "Yozgat": 0.38, "Zonguldak": 0.59, "Aksaray": 0.49,
            "Bayburt": 0.41, "Karaman": 0.52, "Kirikkale": 0.53, "Batman": 0.31,
            "Sirnak": 0.15, "Bartin": 0.66, "Ardahan": 0.33, "Igdir": 0.26,
            "Yalova": 0.76, "Karabuk": 0.61, "Kilis": 0.47, "Osmaniye": 0.54,
            "Duzce": 0.67
        };

        // Haritayı oluştur
        const map = L.map('map', {
            dragging: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            touchZoom: false,
            zoomControl: false
        }).setView([39.0, 35.0], 5.8);

        // Altlık haritayı ekle
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        // Renk fonksiyonu
        function getColor(d) {
            return d > 0.8 ? '#10b981' : // yeşil - pozitif
                   d > 0.7 ? '#34d399' : // açık yeşil
                   d > 0.6 ? '#fbbf24' : // amber - orta değer
                   d > 0.5 ? '#f59e0b' : // turuncu
                   d > 0.4 ? '#f43f5e' : // kırmızı
                             '#e11d48';  // koyu kırmızı - negatif
        }

        // İl adı normalleştirme fonksiyonu
        function normalizeProvinceName(name) {
            if (!name) return '';
            return name.toLowerCase()
                .replace(/ı/g, 'i')
                .replace(/ö/g, 'o')
                .replace(/ü/g, 'u')
                .replace(/ş/g, 's')
                .replace(/ğ/g, 'g')
                .replace(/ç/g, 'c')
                .replace(/İ/g, 'i')
                .replace(/Ö/g, 'o')
                .replace(/Ü/g, 'u')
                .replace(/Ş/g, 's')
                .replace(/Ğ/g, 'g')
                .replace(/Ç/g, 'c');
        }

        // GeoJSON yükle
        fetch('https://raw.githubusercontent.com/uyasarkocal/borders-of-turkey/37d3efb5b0f43572b1ad41c62da8abafd1e76fd2/lvl1-TR.geojson')
            .then(response => response.json())
            .then(data => {
                // İl-sentiment eşleştirme tablosu
                const provinceMapping = {};
                
                // Her il için eşleşme oluştur
                data.features.forEach(feature => {
                    const provinceName = feature.properties.NAME_1;
                    if (!provinceName) return;
                    
                    // Doğrudan eşleşme kontrol et
                    if (sentimentData[provinceName] !== undefined) {
                        provinceMapping[provinceName] = provinceName;
                        return;
                    }
                    
                    // Normalize edilmiş isimler ile eşleşme ara
                    const normalizedName = normalizeProvinceName(provinceName);
                    for (const key in sentimentData) {
                        if (normalizeProvinceName(key) === normalizedName) {
                            provinceMapping[provinceName] = key;
                            return;
                        }
                    }
                    
                    // Özel durumlar
                    if (provinceName === "Afyon") {
                        provinceMapping[provinceName] = "Afyonkarahisar";
                    } 
                    else if (provinceName === "Icel" || provinceName === "İçel") {
                        provinceMapping[provinceName] = "Mersin";
                    }
                    else if (provinceName === "K. Maras" || provinceName === "K.Maras") {
                        provinceMapping[provinceName] = "Kahramanmaras";
                    }
                });
                
                // GeoJSON katmanı oluştur
                const geojson = L.geoJson(data, {
                    // Stil fonksiyonu
                    style: function(feature) {
                        const provinceName = feature.properties.NAME_1;
                        const matchedName = provinceMapping[provinceName];
                        const sentimentValue = matchedName ? sentimentData[matchedName] : undefined;
                        
                        return {
                            fillColor: sentimentValue !== undefined ? getColor(sentimentValue) : '#e2e8f0',
                            weight: 1.5,
                            opacity: 1,
                            color: 'white',
                            dashArray: '',
                            fillOpacity: 0.85
                        };
                    },
                    
                    // Her il için özellik ekleme
                    onEachFeature: function(feature, layer) {
                        const provinceName = feature.properties.NAME_1;
                        const matchedName = provinceMapping[provinceName];
                        const sentimentValue = matchedName ? sentimentData[matchedName] : undefined;
                        
                        // Popup içeriği
                        let popupContent = `<div class="font-bold">${provinceName}</div>`;
                        if (sentimentValue !== undefined) {
                            let colorClass = sentimentValue > 0.7 ? 'text-green-600' : 
                                           sentimentValue > 0.5 ? 'text-amber-600' : 'text-red-600';
                            popupContent += `<div class="${colorClass} font-semibold">Pozitif Oran: %${(sentimentValue * 100).toFixed(0)}</div>`;
                        } else {
                            popupContent += `<div class="text-gray-500 italic">Veri bulunmuyor</div>`;
                        }
                        
                        // Popup'ı ekle
                        layer.bindPopup(popupContent);
                        
                        // Hover ve tıklama olayları
                        layer.on({
                            // Mouse üzerindeyken
                            mouseover: function(e) {
                                const layer = e.target;
                                layer.setStyle({
                                    weight: 3,
                                    color: '#4338ca',
                                    dashArray: '',
                                    fillOpacity: 0.9
                                });
                                layer.bringToFront();
                            },
                            // Mouse dışarı çıkınca
                            mouseout: function(e) {
                                geojson.resetStyle(e.target);
                            },
                            // Tıklanınca
                            click: function(e) {
                                layer.openPopup();
                            }
                        });
                    }
                }).addTo(map);
                
                // Lejant ekle
                const legend = L.control({position: 'bottomright'});
                legend.onAdd = function() {
                    const div = L.DomUtil.create('div', 'info legend bg-white p-4 rounded-md custom-shadow');
                    
                    // Başlık
                    div.innerHTML = '<div class="text-center mb-2"><strong>Pozitiflik Oranı</strong></div>';
                    
                    // Renk değerleri
                    const grades = [0.8, 0.7, 0.6, 0.5, 0.4];
                    const labels = ['%80+', '%70-80', '%60-70', '%50-60', '%40-50', '<%40'];
                    
                    div.innerHTML += '<div class="flex flex-col space-y-2">';
                    
                    // Her renk için kutu
                    for (let i = 0; i < grades.length; i++) {
                        div.innerHTML += 
                            '<div class="flex items-center">' +
                            '<i style="background:' + getColor(grades[i]) + '; width:20px; height:20px; display:inline-block; margin-right:8px; border-radius:2px;"></i> ' +
                            '<span>' + labels[i] + '</span>' +
                            '</div>';
                    }
                    
                    // Son kutu (en düşük değer)
                    div.innerHTML += 
                        '<div class="flex items-center">' +
                        '<i style="background:' + getColor(0.3) + '; width:20px; height:20px; display:inline-block; margin-right:8px; border-radius:2px;"></i> ' +
                        '<span>' + labels[5] + '</span>' +
                        '</div>';
                    
                    div.innerHTML += '</div>';
                    
                    return div;
                };
                legend.addTo(map);
                
                console.log("Harita başarıyla oluşturuldu!");
            })
            .catch(error => {
                console.error("GeoJSON yüklenirken hata oluştu:", error);
                mapContainer.innerHTML = `<div class="flex items-center justify-center h-full bg-red-50 text-red-800 p-4 rounded">
                    <div class="text-center">
                        <p class="font-bold">Harita yüklenirken hata oluştu</p>
                        <p class="text-sm mt-2">${error.message}</p>
                        <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Yeniden Dene</button>
                    </div>
                </div>`;
            });
    }
}