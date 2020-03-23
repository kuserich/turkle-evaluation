import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Translations = new Mongo.Collection('translations');
export const SingleTranslations = new Mongo.Collection('translations_single');
export const ShuffledTranslations = new Mongo.Collection('translations.shuffled');
export const ShuffledTranslationPairs = new Mongo.Collection('translations.pairs.shuffled');

Meteor.methods({

    'singleTranslations.answers.update'(translationId, key, value) {
        const translation = SingleTranslations.findOne({ _id: translationId });
        const newAnswers = !!translation && !!translation.answers ? translation.answers : {};
        newAnswers[key] = value;
        return SingleTranslations.update({ _id: translationId }, { $set: { answers: newAnswers } });
    },

    'translations.answers.update'(translationId, key, value) {
        const translation = Translations.findOne({ _id: translationId });
        const newAnswers = !!translation && !!translation.answers ? translation.answers : {};
        newAnswers[key] = value;
        return Translations.update({ _id: translationId }, { $set: { answers: newAnswers } });
    },

    'translations.ranking.update'(translationId, value) {
        return Translations.update({ _id: translationId }, { $set: { ranking: value } });
    }

});
