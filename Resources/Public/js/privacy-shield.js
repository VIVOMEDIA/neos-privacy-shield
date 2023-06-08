window.addEventListener('DOMContentLoaded', (event) => {
    PrivacyShield.allowConsentedShieldTypes();
});

document.querySelectorAll('.consent-privacy-shield').forEach(shield => {
    shield.addEventListener('click', (e) => {
        var type = e.target.closest('.privacy-shield').getAttribute('data-type');
        PrivacyShield.consentPrivacyShield(type);
    });
});

var PrivacyShield = {

    getConsentFromStore() {
        if (!window.sessionStorage) {
            return {};
        }

        var consent = JSON.parse(sessionStorage.getItem('privacy-shield-consent'));

        if (consent === null) {
            consent = {};
        }

        return consent;
    },

    putConsentIntoStore(consent) {
        if (!window.sessionStorage) {
            return;
        }
        sessionStorage.setItem('privacy-shield-consent', JSON.stringify(consent));
    },

    storeConsent(type, source, value) {
        consent = this.getConsentFromStore();
        consent[type] = consent[type] ?? {};
        consent[type][source] = value;

        this.putConsentIntoStore(consent);
    },

    revokeConsentPrivacyShield(type, source) {
        this.storeConsent(type, source, false);
    },

    consentPrivacyShield(type, source = 'privacyShield') {
        this.replacePreviewWithOriginalContent(type);
        this.storeConsent(type, source, true);
    },

    replacePreviewWithOriginalContent(type) {
        document.querySelectorAll('.privacy-shield[data-type="' + type + '"]').forEach(shield => {
            originalContentString = shield.querySelectorAll('.original-content')[0].innerText;

            var originalContentWrapper = document.createElement('div');
            originalContentWrapper.innerHTML = atob(originalContentString.trim()).trim();

            var originalContent = originalContentWrapper.firstChild;

            shield.parentNode.replaceChild(originalContent, shield);
        });

        document.querySelectorAll('script[type="text/plain"][data-privacy-shield-type="' + type + '"]').forEach(script => {

            let originalScript = script.cloneNode();
            originalScript.type = 'application/javascript';

            script.parentNode.replaceChild(originalScript, script);
        });
    },

    removeLoading(type) {
        document.querySelectorAll('.privacy-shield.is-loading[data-type="' + type + '"]').forEach(shield => {
            shield.classList.remove('is-loading');
            shield.classList.add('is-loaded');
        });
    },

    allowConsentedShieldTypes() {
        var consent = this.getConsentFromStore();
        for (const [target, targetConsent] of Object.entries(consent)) {
            var targetAllowed = false;
            for (const [source, value] of Object.entries(targetConsent)) {
                if (targetAllowed === false && value === true) {
                    targetAllowed = true;
                    this.replacePreviewWithOriginalContent(target);
                }
            }
            this.removeLoading(target);
        }
    }
};