/* global define */
define([
    'underscore',
    'app',
    'marionette',
    'helpers/uri',
    'models/tag',
    'collections/tags'
], function (_, App, Marionette, URI, Model) {
    'use strict';

    var Tag = App.module('AppNotebooks.RemoveTag');

    Tag.Controller = Marionette.Controller.extend({
        initialize: function () {
            _.bindAll(this, 'start', 'remove');
        },

        start: function (args) {
            this.model = new Model({id: args.id});

            // Set profile
            this.model.database.getDB(args.profile);

            $.when(this.model.fetch()).done(this.remove);
        },

        remove: function () {
            $.when(this.model.destroySync()).done(this.redirect);
        },

        redirect: function () {
            App.navigate('#' + URI.link('/notebooks'));
        }

    });

    return Tag.Controller;
});
