# VIVOMEDIA.PrivacyShield

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

