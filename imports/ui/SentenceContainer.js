import React from "react";

export default class SentenceContainer extends React.Component {


    get words() {
        const { sentence } = this.props;

        const translation = sentence.translation.split(" ");
        const source = sentence.source.split(" ");
        const target = sentence.target.split(" ");

        const maxLength = Math.max(translation.length, source.length, target.length);
        const words = [];

        for (let i=0; i<maxLength; i++) {
            const y = translation[i] || '';
            const x = source[i] || '';
            const t = target[i] || '';

            const className = y === "@@@" ? "word word--is-epsilon" : "word";

            words.push(
                <div className="words-wrap">
                    <div className="word">{ x }</div>
                    <div className={className}>{ y }</div>
                    <div className="word">{ t }</div>
                </div>
            );
        }

        return words;
    }

    render() {
        return (
            <div>
                <div className="container-sentences">

                    <div className="words-wrap">
                        <div className="word">
                            <b>SOURCE</b>
                        </div>
                        <div className="word">
                            <b>TRANSLATION</b>
                        </div>
                        <div className="word">
                            <b>TARGET</b>
                        </div>
                    </div>
                    { this.words }
                </div>
            </div>

        );
    }

}