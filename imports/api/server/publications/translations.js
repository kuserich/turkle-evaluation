import { Meteor } from 'meteor/meteor';
import {SingleTranslations, Translations } from "../../translations";
import { shuffle } from "../../../lib";


Meteor.publish('singleTranslations.all', function () {
    return SingleTranslations.find();
});

Meteor.publish('translations.all', function () {
    return Translations.find();
});

Meteor.publish('translations.answers.notexists', function () {
    return Translations.find();
});

Meteor.publish('translations.shuffled', function () {
    let initializing = true;
    const translations = Translations.find().fetch();
    const shuffledTranslations = shuffle(translations);

    shuffledTranslations.forEach(({ _id, ...doc }) => { this.added('translations.shuffled', _id, doc) });
    this.ready();

    const observer = Translations.find().observeChanges({

        changed: (id, newFields) => {
            if (initializing) {
                return false;
            }
            this.changed('translations.shuffled', id, newFields);
        }

    });

    initializing = false;
    this.onStop(() => observer.stop());
});


Meteor.publish('translations.pairs.shuffled', function () {
    let initializing = true;
    const aggregationCursor = Translations.rawCollection().aggregate([
        {
            $group: {
                _id: "$source",
                docId: { $first: '$_id' },
                source: { $first: '$source' },
                target: { $first: '$target' },
                translations: {
                    $push: {
                        _id: '$_id',
                        translation: '$translation',
                        model: "$model",
                        ranking: "$ranking",
                    }
                }
            }
        }
    ]);
    const translations = Meteor.wrapAsync(aggregationCursor.toArray, aggregationCursor)();


    translations.forEach(({ _id, source, target, translations }) => {
        const shuffledTranslations = shuffle(translations);
        const rankings = {};

        translations.forEach((s) => {
            if (s.ranking) {
                rankings[s.model] = s.ranking;
            }
        });

        this.added('translations.pairs.shuffled', _id, { source, target, translations: shuffledTranslations, rankings });
    });
    this.ready();

    const observer = Translations.find().observe({

        changed: (newDocument) => {
            if (initializing) {
                return false;
            }

            const rankings = {};
            const ts = Translations.find({ source: newDocument.source }).fetch();

            ts.forEach(t => {
                if (t.ranking) {
                    rankings[t.model] = t.ranking;
                }
            });

            this.changed('translations.pairs.shuffled', newDocument.source, { rankings });
        }

    });

    initializing = false;
    this.onStop(() => observer.stop());
});