$(document).ready(function () {
    $(document).on('click', '.consent-privacy-shield', function (e) {
        let type = $(e.target).closest('.privacy-shield').attr('data-type');
        PrivacyShield.consentPrivacyShield(type);
    });

    PrivacyShield.allowConsentedShieldTypes();
});

let PrivacyShield = {

    getConsentFromStore() {
        let consent = JSON.parse(sessionStorage.getItem('privacy-shield-consent'));

        if (consent === null) {
            consent = {};
        }

        return consent;
    },

    putConsentIntoStore(consent) {
        sessionStorage.setItem('privacy-shield-consent', JSON.stringify(consent));
    },

    storeConsent(type, source, value) {
        consent = this.getConsentFromStore();
        consent[type] = consent[type] ?? {}
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
        $('.privacy-shield[data-type="' + type + '"]').each(function (i, shield) {
            $(shield).replaceWith($('.original-content', shield).html());
        });
    },

    removeLoading(type) {
        $('.privacy-shield.loading[data-type="' + type + '"]').each(function (i, shield) {
            $(shield).removeClass('is-loading').addClass('is-loaded');
        });
    },

    allowConsentedShieldTypes() {
        let consent = this.getConsentFromStore();
        for (const [target, targetConsent] of Object.entries(consent)) {
            let targetAllowed = false;
            for (const [source, value] of Object.entries(targetConsent)) {
                if (targetAllowed === false && value === true) {
                    targetAllowed = true;
                    this.replacePreviewWithOriginalContent(target);
                }
            }
            this.removeLoading(target);
        }
    }
}