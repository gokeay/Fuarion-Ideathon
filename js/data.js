// Veri yönetimi ve işleme fonksiyonları

// Veri örneği
const commentData = {
    totalCount: 1254,
    totalLikes: 8732,
    sentiments: {
        positive: 0.75,
        negative: 0.21,
        neutral: 0.04
    },
    topComments: [
        {
            id: 1,
            author: "Ayşe Yılmaz",
            avatar: "https://i.pravatar.cc/40?u=ayse",
            content: "Yapılan hizmetler için teşekkür ederiz, ülkemizin böyle yatırımlara ihtiyacı var.",
            likes: 1892,
            sentiment: "positive"
        },
        {
            id: 2,
            author: "Mehmet Öztürk",
            avatar: "https://i.pravatar.cc/40?u=mehmet",
            content: "Rakamlar güzel ama bizim ilçedeki arıtma tesisi hala bitmedi, umarım en kısa zamanda tamamlanır.",
            likes: 1245,
            sentiment: "neutral"
        },
        {
            id: 3,
            author: "Zeynep Kaya",
            avatar: "https://i.pravatar.cc/40?u=zeynep",
            content: "Çevreye yapılan her yatırım geleceğe yatırımdır. Emeği geçen herkese teşekkürler.",
            likes: 980,
            sentiment: "positive"
        }
    ],
    themes: [
        {
            title: "Projelere Teşekkür ve Takdir",
            description: "Yorumların çoğunluğu yapılan hizmetlerden memnuniyetini dile getiriyor."
        },
        {
            title: "Yerel Proje Talepleri",
            description: "Bazı kullanıcılar kendi bölgelerindeki projelerin durumunu sorguluyor."
        },
        {
            title: "Çevre Bilinci",
            description: "Çevreye yapılan yatırımların önemi sıkça vurgulanıyor."
        }
    ]
};

// Yorumları getiren fonksiyon
function getComments() {
    return commentData.topComments;
}

// Tema analizini getiren fonksiyon
function getThemeAnalysis() {
    return commentData.themes;
}

// Genel metrikleri getiren fonksiyon
function getMetrics() {
    return {
        totalComments: commentData.totalCount,
        totalLikes: commentData.totalLikes,
        positiveRate: commentData.sentiments.positive,
        negativeRate: commentData.sentiments.negative
    };
}
