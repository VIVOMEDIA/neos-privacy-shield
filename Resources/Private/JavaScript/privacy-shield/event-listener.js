import PrivacyShield from "./index.js";

window.addEventListener('DOMContentLoaded', (event) => {
    PrivacyShield.allowConsentedShieldTypes();

    document.querySelectorAll('.consent-privacy-shield').forEach(shield => {
        shield.addEventListener('click', (e) => {
            var type = e.target.closest('.privacy-shield').getAttribute('data-type');
            PrivacyShield.consentPrivacyShield(type);
        });
    });
});
