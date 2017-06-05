import { Accounts, Cart, Emails, Inventory, Orders, Products, Shipping, Shops } from "/lib/collections";

export default function () {
	// Global API configuration
  const Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true,
    defaultHeaders: {
      "Content-Type": "application/json"
    },
    version: "v1"
  });

  function getApiOptions(collectionName) {
    return {
      routeOptions: {
        authRequired: true
      },
      endpoints: {

		// GET all items in collection
        get: {
          roleRequired: ["owner", "admin"],
          action: function () {
            const allRecords = collectionName.find();
            if (allRecords) {
              return {
                statusCode: 201,
                status: "Succes: All records retreived",
                data: allRecords
              };
            }
            return {
              statusCode: 404,
              status: "fail",
              message: "error"
            };
          }
        },

		// POST into a collection
        post: {
          roleRequired: ["owner", "admin"],
          action: function () {
            const isInserted = collectionName.insert(this.bodyParams);
            if (isInserted) {
              return {
                statusCode: 201,
                status: "success",
                data: isInserted
              };
            }

            return { status: "fail", message: "error" };
          }
        },

		// UPDATE a collection
        patch: {
          roleRequired: ["owner", "admin"],
          action: function () {
            const isUpdated = collection.update(this.urlParams.id, {
              $set: this.bodyParams
            });
            if (isUpdated) {
              return {
                statusCode: 201,
                status: "success",
                data: isUpdated
              };
            }
            return {
              status: "fail",
              message: "record not found"
            };
          }
        },

		// DELETE an record in a collection
        delete: {
          roleRequired: ["owner", "admin"],
          action: function () {
            const isDeleted = collection.remove(this.urlParams.id);

            if (isDeleted) {
              return { status: "success",
                data: {
                  message: "record deleted"
                }
              };
            }
          }
        }
      }
    };
  }

  Api.addCollection(Emails, getApiOptions(Emails));
  Api.addCollection(Shops, getApiOptions(Shops));
  Api.addCollection(Products, getApiOptions(Products));
  Api.addCollection(Orders, getApiOptions(Orders));
  Api.addCollection(Cart, getApiOptions(Cart));
  Api.addCollection(Accounts, getApiOptions(Accounts));
  Api.addCollection(Shipping, getApiOptions(Shipping));
  Api.addCollection(Inventory, getApiOptions(Inventory));
}
