import React, { Component, PropTypes } from "react";
import { Meteor } from "meteor/meteor";
import { composeWithTracker } from "/lib/api/compose";
import { Packages } from "/lib/collections";
import { Loading } from "/imports/plugins/core/ui/client/components";
import { TranslationProvider } from "/imports/plugins/core/ui/client/providers";
import { Reaction, i18next } from "/client/api";
import { PaystackSettingsForm } from "../components";

class PaystackSettingsFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiKey: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveUpdate = this.saveUpdate.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ apiKey: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const packageId = this.props.packageData._id;
    const settingsKey = this.props.packageData.registry[0].settingsKey;
    const apiKey = this.state.apiKey;

    const fields = [{
      property: "apiKey",
      value: apiKey
    }];

    this.saveUpdate(fields, packageId, settingsKey);
  }

  saveUpdate(fields, id, settingsKey) {
    Meteor.call("registry/update", id, settingsKey, fields, (err) => {
      if (err) {
        return Alerts.toast(i18next.t("admin.settings.saveFailed"), "error");
      }
      return Alerts.toast(i18next.t("admin.settings.saveSuccess"), "success");
    });
  }

  render() {
    return (
      <TranslationProvider>
        <PaystackSettingsForm
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          packageData={this.props.packageData}
        />
      </TranslationProvider>
    );
  }
}

PaystackSettingsFormContainer.propTypes = {
  packageData: PropTypes.object
};

const composer = ({}, onData) => {
  const subscription = Meteor.subscribe("Packages");
  if (subscription.ready()) {
    const packageData = Packages.findOne({
<<<<<<< HEAD
      name: "paystack-paymentmethod",
=======
      name: "example-paymentmethod",
>>>>>>> 54200697064626eb970f7263efebebf2b7866538
      shopId: Reaction.getShopId()
    });
    onData(null, { packageData });
  }
};

export default composeWithTracker(composer, Loading)(PaystackSettingsFormContainer);