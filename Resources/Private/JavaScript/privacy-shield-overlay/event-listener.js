import initPrivacyShieldOverlay from "./index.js";

document.addEventListener('DOMContentLoaded', function () {
    initPrivacyShieldOverlay();
    window.addEventListener('resize', initPrivacyShieldOverlay);
});

