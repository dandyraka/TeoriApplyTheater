const setlistArray = [
    "Pajama Drive",
    "Aturan Anti Cinta",
    "Matahari Milikku",
    "Demi Seseorang",
    "Gadis Gadis Remaja",
    "Sambil Menggandeng Erat Tanganku",
    "Dewi Theater",
    "Bel Terakhir Berbunyi",
    "Saka Agari",
    "Sekarang Sedang Jatuh Cinta",
    "Fajar Sang Idola",
    "Tunas di Balik Seragam",
    "Cara Meminum Ramune",
    "Ingin Bertemu",
    "Banzai JKT48",
    "Romansa Sang Gadis",
    "Himawari Gumi",
];

let setlisto = "Aturan Anti Cinta";

$(document).ready(() => {
    const setlistSelect = $("#setlist");
    setlistArray.sort();
    
    setlistArray.forEach(setlistItem => {
        const option = $("<option>").val(setlistItem).text(setlistItem);
        setlistSelect.append(option);
    });
});

function showLoading() {
    $("#loading").removeClass("hidden");
    $("#checkText").addClass("hidden");
}

function hideLoading() {
    $("#loading").addClass("hidden");
    $("#checkText").removeClass("hidden");
}

function showLoadingAnim() {
    $("#loadingAnimation").removeClass("hidden");
}

function hideLoadingAnim() {
    $("#loadingAnimation").addClass("hidden");
}

function updateSetlist() {
    const selectedSetlist = $("#setlist").val();
    const selectedDateTime = $("#showDateTime").val();

    changeSetlist(selectedSetlist, selectedDateTime);
    hideLoading();
}

function changeSetlist(selectedSetlist, selectedDateTime) {
    setlisto = selectedSetlist;
}

function showModal(message) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonText: 'OK'
    });
}

function performGacha() {
    showLoading();
    showLoadingAnim()
    const randomNumber = Math.random();
    const winProbability = 0.2;
    const isWin = randomNumber < winProbability;
    const setlistName = setlisto;
    const jam = $("#waktu").val();
    let applyCount = parseInt(localStorage.getItem('applyCount')) || 0;

    applyCount += 1;
    localStorage.setItem('applyCount', applyCount.toString());

    const intervalId = setInterval(function () {
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        };

        const myArray = ["Detil", "Kalah"];
        shuffleArray(myArray);
        const [firstElement, ...shuffledArray] = myArray;

        updateResultText(shuffledArray);
    }, 100);      

    setTimeout(function() {
        clearInterval(intervalId);
        hideLoading();
        hideLoadingAnim();

        if (isWin) {
            localStorage.setItem('applyCount', '0');
        }

        Swal.fire({
            html: '<b>[Teater JKT48] E-mail Pengumuman Hasil Undian Tiket</b><br><br>Terima kasih telah menggunakan website resmi JKT48.<br>' + (isWin ?
                `Selamat, kamu sudah memenangkan undian tiket pertunjukan ${setlistName}.<br>Pada hari pertunjukan, mohon perlihatkan barcode dari halaman My Page pada layar smartphone kepada staf resepsionis.` :
                'Proses pengundian untuk tiket pertunjukan telah selesai.<br>Mohon maaf anda tidak mendapatkan tiket untuk pertunjukan:<br><br>▼Show<br>'+
                `${setlistName}<br><br>`+
                'Mohon dukungannya selalu untuk JKT48.<br><br>'+
                'JKT48 Operation Team') + `<br><br><pre>Apply ke-${applyCount}<br>Teori: Apply jam ${jam} ${(isWin) ? `detil` : 'kalah'} wots!</pre>`,
            customClass: { content: 'text-align-left' },
            imageUrl: isWin ? "/Assets/menang.gif" : "/Assets/kalah.gif",
            imageWidth: 200,
            confirmButtonText: "OK"
        });
    }, 3000);
}

function updateResultText(resultText) {
    $("#loading").html(resultText);
}