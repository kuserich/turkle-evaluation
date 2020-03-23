import { Meteor } from 'meteor/meteor';
import { ShuffledTranslationPairs } from "../api/translations";
import { withTracker } from 'meteor/react-meteor-data';

import React from 'react';
import Button from "./Button";

class RateTranslationQuality extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            isLoading: true,
            answers: [],
        };

        this.handleClickBackButton = this.handleClickBackButton.bind(this);
        this.handleClickNextButton = this.handleClickNextButton.bind(this);
    }

    get currentSentence() {
        const { currentIndex } = this.state;
        const { translations } = this.props;
        return translations[currentIndex];
    }

    handleClickButton(key, value) {
        const currentSentence = this.currentSentence;
        Meteor.call('translations.ranking.update', currentSentence.source, key, value);
    }

    isButtonSelected(key, value) {
        const currentSentence = this.currentSentence;
        return !!currentSentence.answers && !!currentSentence.answers[key] && currentSentence.answers[key] === value;
    }

    handleClickBackButton() {
        const { currentIndex } = this.state;
        const newIndex = Math.max(currentIndex - 1, 0);
        this.setState({ currentIndex: newIndex });
    }

    handleClickNextButton() {
        this.setState(({ currentIndex }) => ({ currentIndex: currentIndex + 1 }));
    }

    handleClickRankingButton(index, value) {
        const { translations } = this.currentSentence;
        const { _id } = translations[index];
        Meteor.call('translations.ranking.update', _id, value);
    }

    isButtonSelected(index, value) {
        const currentSentence = this.currentSentence;
        const model = currentSentence.translations[index].model;

        if (!currentSentence.rankings) {
            return false;
        }

        if (!currentSentence.rankings[model]) {
            return false;
        }

        return currentSentence.rankings[currentSentence.translations[index].model] === value;
    }

    render() {
        const { isLoading } = this.props;

        if (isLoading) {
            return (
                <div>Loading...</div>
            );
        }

        return (
            <div className="main">

                <h3>Source, Target, Translations</h3>
                <div>
                    <div>
                        { this.currentSentence.source }
                    </div>
                    <div>
                        { this.currentSentence.target }
                    </div>
                    <div className="container-sentences">
                        { this.currentSentence.translations[0].translation }
                    </div>
                    <div className="container-sentences">
                        { this.currentSentence.translations[1].translation }
                    </div>
                    <div className="container-sentences">
                        { this.currentSentence.translations[2].translation }
                    </div>
                </div>

                <div>
                    <Button onClick={() => this.handleClickRankingButton(0, 1)}
                            isSelected={this.isButtonSelected(0, 1)}
                    >
                        1
                    </Button>
                    <Button onClick={() => this.handleClickRankingButton(0, 2)}
                            isSelected={this.isButtonSelected(0, 2)}
                    >
                        2
                    </Button>
                    <Button onClick={() => this.handleClickRankingButton(0, 3)}
                            isSelected={this.isButtonSelected(0, 3)}
                    >
                        3
                    </Button>
                </div>
                <div>
                    <Button onClick={() => this.handleClickRankingButton(1, 1)}
                            isSelected={this.isButtonSelected(1, 1)}
                    >
                        1
                    </Button>
                    <Button onClick={() => this.handleClickRankingButton(1, 2)}
                            isSelected={this.isButtonSelected(1, 2)}
                    >
                        2
                    </Button>
                    <Button onClick={() => this.handleClickRankingButton(1, 3)}
                            isSelected={this.isButtonSelected(1, 3)}
                    >
                        3
                    </Button>
                </div>
                <div>
                    <Button onClick={() => this.handleClickRankingButton(2, 1)}
                            isSelected={this.isButtonSelected(2, 1)}
                    >
                        1
                    </Button>
                    <Button onClick={() => this.handleClickRankingButton(2, 2)}
                            isSelected={this.isButtonSelected(2, 2)}
                    >
                        2
                    </Button>
                    <Button onClick={() => this.handleClickRankingButton(2, 3)}
                            isSelected={this.isButtonSelected(2, 3)}
                    >
                        3
                    </Button>
                </div>


                <div>
                    <Button onClick={this.handleClickBackButton}>
                        Back
                    </Button>
                    <Button onClick={this.handleClickNextButton}>
                        Next
                    </Button>
                    <Button onClick={() => this.handleClickSaveButton()}>
                        save results
                    </Button>
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    const subscription = Meteor.subscribe('translations.pairs.shuffled');
    const isLoading = !subscription.ready();

    const translations = ShuffledTranslationPairs.find().fetch();

    return {
        isLoading,
        translations,
    };

})(RateTranslationQuality);
