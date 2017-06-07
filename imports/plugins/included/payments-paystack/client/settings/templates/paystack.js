<<<<<<< HEAD
import { PaystackSettingsFormContainer } from "../containers";
import { Template } from "meteor/templating";
import "./paystack.html";

Template.exampleSettings.helpers({
  PaystackSettings() {
    return {
      component: PaystackSettingsFormContainer
    };
=======
/* eslint-disable no-undef */
import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import { Packages } from "/lib/collections";
import { PaystackPackageConfig } from "../../../lib/collections/schemas";

import "./paystack.html";


Template.paystackSettings.helpers({
  PaystackPackageConfig() {
    return PaystackPackageConfig;
  },
  packageData() {
    return Packages.findOne({
      name: "paystack",
      shopId: Reaction.getShopId()
    });
  }
});


Template.paystack.helpers({
  packageData: function () {
    return Packages.findOne({
      name: "paystack",
      shopId: Reaction.getShopId()
    });
  }
});

Template.paystack.events({
  "click [data-event-action=showPaystackSettings]": function () {
    Reaction.showActionView();
  }
});

AutoForm.hooks({
  "paystack-update-form": {
    onSuccess: function () {
      Alerts.removeSeen();
      return Alerts.add("Paystack Payment Method settings saved.", "success");
    },
    onError: function (operation, error) {
      Alerts.removeSeen();
      return Alerts.add("Paystack Payment Method settings update failed. " + error, "danger");
    }
>>>>>>> 54200697064626eb970f7263efebebf2b7866538
  }
});