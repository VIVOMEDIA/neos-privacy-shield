function initPrivacyShieldOverlay() {
    // Privacy Shield overflow
    document.querySelectorAll('.privacy-shield').forEach(function (shield) {
        const privacyBanner = shield.querySelector('.privacy-banner');
        const previewContentPicture = shield.querySelector('.preview-content picture');

        if (privacyBanner && previewContentPicture) {
            if (privacyBanner.offsetHeight <= previewContentPicture.offsetHeight) {
                privacyBanner.classList.add('is-overlay');
            } else {
                privacyBanner.classList.remove('is-overlay');
            }
        }
    });
}

export default initPrivacyShieldOverlay;