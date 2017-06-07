import { PaystackSettingsFormContainer } from "../containers";
import { Template } from "meteor/templating";
import "./paystack.html";

Template.exampleSettings.helpers({
  PaystackSettings() {
    return {
      component: PaystackSettingsFormContainer
    };
  }
});