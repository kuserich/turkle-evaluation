import { Meteor } from 'meteor/meteor';
import {ShuffledTranslations, SingleTranslations, Translations} from "../api/translations";
import { withTracker } from 'meteor/react-meteor-data';

import React from 'react';
import SentenceContainer from "./SentenceContainer";
import Button from "./Button";

class RateEpsilonTokensSingle extends React.Component {

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
        Meteor.call('singleTranslations.answers.update', currentSentence._id, key, value);
    }

    isButtonSelected(key, value) {
        const { currentIndex } = this.state;
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

    render() {
        const { isLoading } = this.props;

        if (isLoading) {
            return (
                <div>Loading...</div>
            );
        }

        return (
            <div className="main">
                <SentenceContainer sentence={this.currentSentence}/>

                <div className="container-questions">
                    <div className="question">
                        <h3>Do the padding tokens make sense?</h3>

                        <Button
                            onClick={() => this.handleClickButton('padding-tokens-make-sense', 'yes')}
                            isSelected={this.isButtonSelected('padding-tokens-make-sense', 'yes')}
                        >
                            Yes
                        </Button>

                        <Button
                            onClick={() => this.handleClickButton('padding-tokens-make-sense', 'yes-not-all')}
                            isSelected={this.isButtonSelected('padding-tokens-make-sense', 'yes-not-all')}
                        >
                            Yes, but not all
                        </Button>

                        <Button
                            onClick={() => this.handleClickButton('padding-tokens-make-sense', 'no')}
                            isSelected={this.isButtonSelected('padding-tokens-make-sense', 'no')}
                        >
                            No
                        </Button>

                        <Button
                            onClick={() => this.handleClickButton('padding-tokens-make-sense', 'i dont know')}
                            isSelected={this.isButtonSelected('padding-tokens-make-sense', 'i dont know')}
                        >
                            I don't know
                        </Button>
                    </div>

                    <div className="question">
                        <h3>Did the model use all Epsilon Tokens?</h3>

                        <Button
                            onClick={() => this.handleClickButton('use-up-epsilon-limit', 'yes')}
                            isSelected={this.isButtonSelected('use-up-epsilon-limit', 'yes')}
                        >
                            Yes
                        </Button>

                        <Button
                            onClick={() => this.handleClickButton('use-up-epsilon-limit', 'no')}
                            isSelected={this.isButtonSelected('use-up-epsilon-limit', 'no')}
                        >
                            No
                        </Button>
                    </div>

                    <div className="question">
                        <h3>Could the model have used fewer epsilon tokens?</h3>

                        <Button
                            onClick={() => this.handleClickButton('could-use-fewer-epsilon', 'yes')}
                            isSelected={this.isButtonSelected('could-use-fewer-epsilon', 'yes')}
                        >
                            Yes
                        </Button>

                        <Button
                            onClick={() => this.handleClickButton('could-use-fewer-epsilon', 'probably-yes')}
                            isSelected={this.isButtonSelected('could-use-fewer-epsilon', 'probably-yes')}
                        >
                            Probably Yes
                        </Button>

                        <Button
                            onClick={() => this.handleClickButton('could-use-fewer-epsilon', 'probably-no')}
                            isSelected={this.isButtonSelected('could-use-fewer-epsilon', 'probably-no')}
                        >
                            Probably No
                        </Button>

                        <Button
                            onClick={() => this.handleClickButton('could-use-fewer-epsilon', 'no')}
                            isSelected={this.isButtonSelected('could-use-fewer-epsilon', 'no')}
                        >
                            No
                        </Button>

                        <Button
                            onClick={() => this.handleClickButton('could-use-fewer-epsilon', 'i dont know')}
                            isSelected={this.isButtonSelected('could-use-fewer-epsilon', 'i dont know')}
                        >
                            I don't know
                        </Button>

                    </div>

                    <div className="question">
                        <h3>Could the model have required more epsilon tokens?</h3>

                        <Button
                            onClick={() => this.handleClickButton('need-more-epsilon', 'yes')}
                            isSelected={this.isButtonSelected('need-more-epsilon', 'yes')}
                        >
                            Yes
                        </Button>

                        <Button
                            onClick={() => this.handleClickButton('need-more-epsilon', 'probably-yes')}
                            isSelected={this.isButtonSelected('need-more-epsilon', 'probably-yes')}
                        >
                            Probably Yes
                        </Button>

                        <Button
                            onClick={() => this.handleClickButton('need-more-epsilon', 'probably-no')}
                            isSelected={this.isButtonSelected('need-more-epsilon', 'probably-no')}
                        >
                            Probably No
                        </Button>

                        <Button
                            onClick={() => this.handleClickButton('need-more-epsilon', 'no')}
                            isSelected={this.isButtonSelected('need-more-epsilon', 'no')}
                        >
                            No
                        </Button>

                        <Button
                            onClick={() => this.handleClickButton('need-more-epsilon', 'i dont know')}
                            isSelected={this.isButtonSelected('need-more-epsilon', 'i dont know')}
                        >
                            I don't know
                        </Button>

                    </div>
                    <div className="question">
                        <h3>Is the translation too long?</h3>

                        <Button
                            onClick={() => this.handleClickButton('is-translation-too-long', 'yes')}
                            isSelected={this.isButtonSelected('is-translation-too-long', 'yes')}
                        >
                            Yes
                        </Button>

                        <Button
                            onClick={() => this.handleClickButton('is-translation-too-long', 'no')}
                            isSelected={this.isButtonSelected('is-translation-too-long', 'no')}
                        >
                            No
                        </Button>

                        <Button
                            onClick={() => this.handleClickButton('is-translation-too-long', 'i dont know')}
                            isSelected={this.isButtonSelected('is-translation-too-long', 'i dont know')}
                        >
                            I don't know
                        </Button>
                    </div>


                    <div className="question">
                        <h3>Is the translation too short?</h3>

                        <Button
                            onClick={() => this.handleClickButton('is-translation-too-short', 'yes')}
                            isSelected={this.isButtonSelected('is-translation-too-short', 'yes')}
                        >
                            Yes
                        </Button>

                        <Button
                            onClick={() => this.handleClickButton('is-translation-too-short', 'no')}
                            isSelected={this.isButtonSelected('is-translation-too-short', 'no')}
                        >
                            No
                        </Button>

                        <Button
                            onClick={() => this.handleClickButton('is-translation-too-short', 'i dont know')}
                            isSelected={this.isButtonSelected('is-translation-too-short', 'i dont know')}
                        >
                            I don't know
                        </Button>
                    </div>

                    <div className="question">
                        <h3>Is there only one block of Epsilon Tokens?</h3>

                        <Button
                            onClick={() => this.handleClickButton('is-epsilon-in-single-block', 'yes')}
                            isSelected={this.isButtonSelected('is-epsilon-in-single-block', 'yes')}
                        >
                            Yes
                        </Button>

                        <Button
                            onClick={() => this.handleClickButton('is-epsilon-in-single-block', 'no')}
                            isSelected={this.isButtonSelected('is-epsilon-in-single-block', 'no')}
                        >
                            No
                        </Button>

                        <Button
                            onClick={() => this.handleClickButton('is-epsilon-in-single-block', 'i dont know')}
                            isSelected={this.isButtonSelected('is-epsilon-in-single-block', 'i dont know')}
                        >
                            I don't know
                        </Button>
                    </div>

                    <div className="question">
                        <h3>Did the model simplify / shorten some tokens? (e.g. United States of America -> Amerika)</h3>

                        <Button
                            onClick={() => this.handleClickButton('model-make-shorter-sentence', 'yes')}
                            isSelected={this.isButtonSelected('model-make-shorter-sentence', 'yes')}
                        >
                            Yes
                        </Button>

                        <Button
                            onClick={() => this.handleClickButton('model-make-shorter-sentence', 'no')}
                            isSelected={this.isButtonSelected('model-make-shorter-sentence', 'no')}
                        >
                            No
                        </Button>

                        <Button
                            onClick={() => this.handleClickButton('model-make-shorter-sentence', 'i dont know')}
                            isSelected={this.isButtonSelected('model-make-shorter-sentence', 'i dont know')}
                        >
                            I don't know
                        </Button>
                    </div>

                    <div className="question">
                        <h3>Did the model add some tokens? (e.g. Inneministerium -> Ministerium für Innenpolitk)</h3>

                        <Button
                            onClick={() => this.handleClickButton('model-make-longer-sentence', 'yes')}
                            isSelected={this.isButtonSelected('model-make-longer-sentence', 'yes')}
                        >
                            Yes
                        </Button>

                        <Button
                            onClick={() => this.handleClickButton('model-make-longer-sentence', 'no')}
                            isSelected={this.isButtonSelected('model-make-longer-sentence', 'no')}
                        >
                            No
                        </Button>

                        <Button
                            onClick={() => this.handleClickButton('model-make-longer-sentence', 'i dont know')}
                            isSelected={this.isButtonSelected('model-make-longer-sentence', 'i dont know')}
                        >
                            I don't know
                        </Button>
                    </div>
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
    const subscription = Meteor.subscribe('singleTranslations.all');
    const isLoading = !subscription.ready();

    const translations = SingleTranslations.find().fetch();

    return {
        isLoading,
        translations,
    };

})(RateEpsilonTokensSingle);
