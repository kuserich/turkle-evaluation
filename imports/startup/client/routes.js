import { Meteor } from 'meteor/meteor';
import React from 'react';
import { mount } from 'react-mounter';
import RateEpsilonTokens from "../../ui/RateEpsilonTokens";
import App from '../../ui/App';
import RateTranslationQuality from "../../ui/RateTranslationQuality";
import RateEpsilonTokensSingle from "../../ui/RateEpsilonTokensSingle";

FlowRouter.route('/', {
    name: 'home',
    action() {
        mount(App, {
            content: <RateEpsilonTokens />
        });
    },
});

FlowRouter.route('/rate', {
    name: 'rate',
    action() {
        mount(App, {
            content: <RateTranslationQuality />
        });
    },
});

FlowRouter.route('/single', {
    name: 'rate',
    action() {
        mount(App, {
            content: <RateEpsilonTokensSingle />
        });
    },
});