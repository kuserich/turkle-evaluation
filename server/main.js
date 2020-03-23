import { Meteor } from 'meteor/meteor';

import '../imports/api/translations';
import '../imports/api/server/publications/translations';

import { translations_data } from "../imports/api/translations_data";
import { Translations } from "../imports/api/translations";

Meteor.startup(() => {
    // code to run on server at startup

    const hasTranslations = Translations.find().fetch().length > 0;
    if (!hasTranslations) {
        const NUM_TO_INSERT = 60;
        translations_data.slice(0, NUM_TO_INSERT).forEach(({ sources, targets, translations }) => {
            Translations.insert({ source: sources, target: targets, translation: translations.default, model: "default" });
            Translations.insert({ source: sources, target: targets, translation: translations.kd, model: "kd" });
            Translations.insert({ source: sources, target: targets, translation: translations.tf, model: "tf" });
        });
    }

});
