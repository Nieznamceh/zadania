window.onload = function() {
    const photos = document.querySelectorAll("img");

    photos.forEach(photo => {
        photo.addEventListener("click", () => {
            console.log("Kliknięto zdjęcie:", photo.alt);
        });
    });
}

