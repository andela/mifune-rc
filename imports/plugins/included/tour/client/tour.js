import introJs from "intro.js";
import { Reaction } from "/client/api";
import { Meteor } from "meteor/meteor";
import { Accounts } from "/lib/collections";

const tour = introJs.introJs();
const adminTourSteps = [
  {
    intro: `<h2>Welcome to <strong>Reaction Commerce </strong></h2>
    <hr>
    <div>
      <strong>Reaction</strong> is a unique e-commerce for SMEs.
    </div>`
  },
  {
    element: ".product-grid-list",
    intro: `<h2>Products</h2>
    <hr>
    <div>
      All available products would be displayed here. Just browse through.<br>
      When you find that product you have been searching for, click on it and proceed to adding it to your cart.
      <br><strong>OR</strong>
      <br>As a Vendor/Admin you can edit, update, delete your products by clicking on them to visit the product detail page.
    </div>`
  },
  {
    element: ".search",
    intro: `<h2>Search</h2>
    <hr>
    <div>
      With countless number of products waiting to be checked out, we help you
      discover that product you're looking for.
    </div>`
  },
  {
    element: ".cart",
    intro: `<h2>My Cart</h2>
    <hr>
    <div>
      Click on the cart icon to check out. <br>
      We currently offer <strong>Paystack</strong> as the only mean of payment.
    </div>`
  },
  {
    element: ".languages",
    intro: `<h2>Languages</h2>
    <hr>
    <div>
      Click on language icon and select you preferred language from the dropdown.
    </div>`
  },
  {
    element: "#accounts",
    intro: `<h2>Account Options</h2>
    <hr>
    <div style="height:200px; overflow-y: scroll;">
      Here we have several other options to help you customize your account, and also get the best out of
      <strong>Reaction</strong> Commerce. Just choose from one of the following options available in the dropdown shown in the screen shot below
      <ol>
        <li>
          <strong>Profile: </strong>
          <span><img src= "/resources/avatar.gif" class="product-grid-item-images img-responsive"></span>
          View and update your profile details.
        </li>
        <li>
          <strong>Dashboard: </strong>
          <span></strong><img src= "/resources/dashboard.png" class="product-grid-item-images img-responsive"></span>
          View your dashboard. Manage the various packages offered by <strong>Reaction</strong>
        </li>
        <li>
          <strong>Accounts: </strong>
          <span><img src= "/resources/admin_accounts.png" class="product-grid-item-images img-responsive"></span>
           View and manage accounts of your clients.
        </li>
        <li>
          <strong>Add Products: </strong>
          <span><img src= "/resources/add_product.png" class="product-grid-item-images img-responsive"></span>
          Add new products to your shop
        </li>
        <li>
          <strong>Orders: </strong>
           <span><img src= "/resources/orders.png" class="product-grid-item-images img-responsive"></span>
           Checkout orders for your products and carry out actions related to your customers orders
        </li>
        <li>
          <strong>Sign out: </strong> Click <strong>Sign Out</strong> button if you wish to sign out. <br>
          You can always log back in by clicking the same account button next time.
          <span>
            <img src= "https://secure.gravatar.com/avatar/989039c5e2d4215b0b4e5208400ee1a0?size=40&default=identicon" class="product-grid-item-images img-responsive">
          </span>
        <l/i>
      <ol>
    </div>`
  },
  {
    element: ".tour",
    intro: `<h2>Tour</h2>
    <hr>
    <div>
      If you ever need to take a tour again, I'm here.
    </div>`
  }
];

const registeredBuyerTourSteps = [
  {
    intro: `<h2>Welcome to <strong>Reaction</strong> Commerce</h2>
    <hr>
    <div>
      <strong>Reaction</strong> Commererce is your one stop ecommerce platform for all types of goods and services.<br>
      This brief tour would help you get up and running with our platform.
    </div>`
  },
  {
    element: ".product-grid-list",
    intro: `<h2>Products</h2>
    <hr>
      All available products would be displayed here. Just browse through.`
  },
  {
    element: ".search",
    intro: `<h2>Search</h2>
    <hr>
    <div>
      With countless number of products waiting to be checked out, we help you
      discover that product you're looking for.
      <br> Found that product ? Click on it's icon, and proceed to adding it to your cart
    </div>`
  },
  {
    element: ".cart",
    intro: `<h2>My Cart</h2>
    <hr>
    <div>
      Click on the cart icon to check out. <br>
      We currently offer <strong>Paystack</strong> as the only mean of payment.
    </div>`
  },
  {
    element: ".languages",
    intro: `<h2>Languages</h2>
    <hr>
    <div>
      Just click on language icon and select you preferred language from the dropdown.
    </div>`
  },
  {
    element: "#accounts",
    intro: `<h2>Account Options</h2>
    <hr>
    <div>
      Here you can access several other account related options by clicking to reveal the dropdown:
      <ol>
        <li>
          <strong>Profile: </strong>
          <span><img src= "/resources/avatar.gif" class="product-grid-item-images img-responsive"></span>
          View and update your profile details. You can also upgrade your account to a Vendor account.
        </li>
        <li>
          <strong>Sign out: </strong> Click <strong>Sign Out</strong> button if you wish to sign out. <br>
          You can always log back in by clicking the same account button next time.
          <span>
            <img src= "https://secure.gravatar.com/avatar/989039c5e2d4215b0b4e5208400ee1a0?size=40&default=identicon" class="product-grid-item-images img-responsive">
          </span>
        <l/i>
      </ol>
    </div>`
  },
  {
    element: ".tour",
    intro: `<h2>Tour</h2>
    <hr>
    <div>
      If you ever need to take a tour again, I'm here.
    </div>`
  }
];

const unregisteredBuyerTourSteps = [
  {
    intro: `<h2>Welcome to <strong>Reaction</strong> Commerce</h2>
    <hr>
    <div>
      <strong>Reaction</strong> Commererce is your one stop ecommerce platform for all types of goods and services.<br>
      This brief tour would help you get up and running with our platform.
    </div>`
  },
  {
    element: ".product-grid-list",
    intro: `<h2>Products</h2>
    <hr>
      All available products would be displayed here. Just browse through.`
  },
  {
    element: ".search",
    intro: `<h2>Search</h2>
    <hr>
    <div>
      With countless number of products waiting to be checked out, we help you
      discover that product you're looking for.
      <br> Found that product ? Click on it's icon, and proceed to adding it to your cart
    </div>`
  },
  {
    element: ".cart",
    intro: `<h2>My Cart</h2>
    <hr>
    <div>
      Click on the cart icon to check out. <br>
      We currently offer <strong>Paystack</strong> as the only mean of payment.
    </div>`
  },
  {
    element: ".languages",
    intro: `<h2>Languages</h2>
    <hr>
    <div>
      Just click on language icon and select you preferred language from the dropdown.
    </div>`
  },
  {
    element: "#accounts",
    intro: `<h2>Account Options</h2>
    <hr>
    <div>
      To buy a product you would need to register and that's very simple :<br>
      Either click on this Icon to reveal a dropdown where you can enter needed details to register <strong>OR</strong><br>
      When you click on your cart to checkout, you would also be presented with the compulsory registration option to proceed
      with your purchase.
    </div>`
  },
  {
    element: ".tour",
    intro: `<h2>Tour</h2>
    <hr>
    <div>
      If you ever need to take a tour again, I'm here.
    </div>`
  }
];

const updateTakenTour = () => {
  if (!Accounts.findOne(Meteor.userId()).takenTour) {
    Accounts.update({ _id: Meteor.userId() }, { $set: { takenTour: true } });
  }
};

export function playTour() {
  let tourSteps;
  if (Reaction.hasPermission("admin")) {
    tourSteps = adminTourSteps;
  } else if (!Reaction.hasPermission("anonymous")) {
    tourSteps = registeredBuyerTourSteps;
  } else {
    tourSteps = unregisteredBuyerTourSteps;
  }
  tour.setOptions({
    showBullets: true,
    showProgress: true,
    scrollToElement: true,
    showStepNumbers: false,
    tooltipPosition: "auto",
    steps: tourSteps
  });
  tour.onexit(updateTakenTour)
  .oncomplete(updateTakenTour);
  tour.start();
}
