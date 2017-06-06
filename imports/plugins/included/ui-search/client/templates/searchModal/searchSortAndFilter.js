import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import underscore from "underscore";

Template.searchSortAndFilter.helpers({
  getBrands(products) {
    console.log("The products are", products);
    const vendors = underscore.pluck(products, "vendor");
    console.log(vendors);
    // return underscore.uniq(vendors);
    return ["reaction", "samsung", "iyanu"];
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
