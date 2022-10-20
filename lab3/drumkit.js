// document.body
document.addEventListener('keypress', onKeyPress)

function onKeyPress(event) {
    const key = event.key
    // ktory dzwiek w zaleznosci od klawisza
    //     const sound = 'clap'
    //     playSound(sound)
    document.getElementById("demo").innerHTML = "The pressed key was: " + key;

    switch(key) {
        case 'b':
            playSound('boom')
            break;
        case 'c':
            playSound('clap')
            break;
        case 'h':
            playSound('hihat')
            break;
        case 'k':
            playSound('kick')
            break;
        case 'o':
            playSound('openhat')
            break;
        case 'r':
            playSound('ride')
            break;
        case 's':
            playSound('snare')
            break;
        case 't':
            playSound('tink')
            break;
        case 'x':
            playSound('tom')
            break;
    }
}

function playSound(sound) {
    const audioTag = document.querySelector('#' + sound)
    audioTag.currentTime = 0
    audioTag.play()
}

// Date.now()

function showLightbox(imageSource) {
    const lightbox = document.querySelector('#lightbox')
    const lightboxImage = document.querySelector('#lightbox-image')
    lightboxImage.src = imageSource
    lightbox.classList.add('visible')
}
