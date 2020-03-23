import React from 'react';

export default class MonoSpacedSentence extends React.Component {

    get longestWord() {
        const { text } = this.props;
        let max = 0;

        const words = text.split(" ");
        for (let i=0; i < words.length; i++) {
            if (words[i].length > max) {
                max = words[i].length;
            }
        }

        return max;
    }

    get words() {
        const { text, maxWidth } = this.props;
        return text.split(" ").map((word, index) => (
            <span key={index}
                  style={{ width: maxWidth * 10 }}
            >
                { word }
            </span>
        ));
    }

    render() {
        return (
            <div className="sentence sentence--translation">
                { this.words }
            </div>
        );
    }

}