import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import underscore from "underscore";

Template.searchSortAndFilter.helpers({
  getBrands(products) {
    const vendors = underscore.pluck(products, "vendor");
    const noDuplicateVendors = underscore.uniq(vendors);
    const lowerCasedVendors = noDuplicateVendors.map((vendor) => {
      const lowerCased = vendor.toLowerCase();
      return lowerCased;
    });
    return lowerCasedVendors;
  },

  capitalize(someString) {
    if (!someString) {
      return;
    }
    if (typeof someString === "string" && someString.length > 0) {
      return someString[0].toUpperCase() + someString.substring(1, someString.length);
    }
  }
});

Template.searchSortAndFilter.events({
  "change #sort-by-price": function (event) {
    Session.set("priceSort", event.target.value);
  },

  "change #filter-by-brand": function (event) {
    Session.set("brandFilter", event.target.value);
  },

  "change #filter-by-price": function (event) {
    Session.set("priceFilter", event.target.value);
  }
});
