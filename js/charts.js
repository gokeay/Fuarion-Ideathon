// Grafik oluşturma ve veri görselleştirme fonksiyonları

// Tüm grafikleri başlatan fonksiyon
function initCharts() {
    // Duygu Dağılımı Grafiği (Doughnut)
    createSentimentChart();
    
    // Yorum Akışı Zaman Çizgisi Grafiği (Line)
    createTimelineChart();
}

// Duygu dağılımı grafiğini oluşturan fonksiyon
function createSentimentChart() {
    const doughnutCtx = document.getElementById('sentimentDoughnutChart');
    if (doughnutCtx) {
        new Chart(doughnutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Pozitif', 'Negatif', 'Nötr'],
                datasets: [{
                    label: 'Yorum Sayısı',
                    data: [940, 263, 51], // %75, %21, %4 oranlarına denk gelen sayılar
                    backgroundColor: ['#22c55e' /* green-500 */, '#ef4444' /* red-500 */, '#64748b' /* slate-500 */],
                    borderColor: '#ffffff',
                    borderWidth: 4,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                                    const percentage = ((context.parsed / total) * 100).toFixed(0);
                                    label += `${context.parsed} Yorum (${percentage}%)`;
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
}

// Zaman çizelgesi grafiğini oluşturan fonksiyon
function createTimelineChart() {
    const timelineCtx = document.getElementById('commentTimelineChart');
    if (timelineCtx) {
        new Chart(timelineCtx, {
            type: 'line',
            data: {
                labels: ['0h', '2h', '4h', '6h', '8h', '12h', '24h', '36h', '48h'],
                datasets: [{
                    label: 'Pozitif Yorumlar',
                    data: [15, 50, 80, 120, 150, 110, 200, 55, 30],
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#22c55e',
                    pointRadius: 0,
                    pointHoverRadius: 6,
                }, {
                    label: 'Negatif Yorumlar',
                    data: [5, 20, 30, 50, 80, 50, 90, 25, 10],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#ef4444',
                    pointRadius: 0,
                    pointHoverRadius: 6,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#e2e8f0' // slate-200
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
            }
        });
    }
}
