// Endpoint URL domain cPanel kamu
const API_URL = "https://eshape.smpm8batu.sch.id/api";

// Fungsi untuk mengambil daftar mata pelajaran
async function loadMapel(kelasSiswa) {
    try {
        const response = await fetch(`${API_URL}/getMapel.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ kelas: kelasSiswa })
        });

        const data = await response.json();

        if (data.status === "success") {
            tampilkanMapel(data.mapel);
        } else {
            console.error("Gagal mengambil data:", data.message);
        }
    } catch (error) {
        console.error("Error koneksi ke API:", error);
    }
}

// Fungsi menampilkan data ke HTML
function tampilkanMapel(listMapel) {
    const container = document.getElementById("container-mapel");
    if (!container) return;

    container.innerHTML = "";
    listMapel.forEach(item => {
        container.innerHTML += `
            <div class="card">
                <h3>${item.namaMapel}</h3>
                <p>Kelas: ${item.kelas}</p>
                <button onclick="mulaiUjian('${item.idMapel}')">Mulai Ujian</button>
            </div>
        `;
    });
}
