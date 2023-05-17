# VIVOMEDIA.PrivacyShield
Neos package to block third party content before consent was given.

## Installation

```bash
composer require vivomedia/neos-privacy-shield
```

## Example usage

```
prototype(Jonnitto.PrettyEmbedYoutube:Component.Youtube) {

    @process.wrap = Neos.Fusion:Component {
        @apply.props = ${props}

        renderer = afx`
            <VIVOMEDIA.PrivacyShield:Molecule.PrivacyShield type="youtube">
                <img src="{props.poster}" />
                <VIVOMEDIA.PrivacyShield:Atom.PrivacyBanner>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
                    <VIVOMEDIA.PrivacyShield:Atom.ConsentButton>Load video</VIVOMEDIA.PrivacyShield:Atom.ConsentButton>
                </VIVOMEDIA.PrivacyShield:Atom.PrivacyBanner>
            </VIVOMEDIA.PrivacyShield:Molecule.PrivacyShield>
        `
    }
}
```
