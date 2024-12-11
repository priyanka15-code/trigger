exports = async function() {
  // A Scheduled Trigger will always call a function without arguments.
  // Documentation on Triggers: https://www.mongodb.com/docs/atlas/atlas-ui/triggers

  // Functions run by Triggers are run as System users and have full access to Services, Functions, and MongoDB Data.

  // Get the MongoDB service you want to use (see "Linked Data Sources" tab)
  const serviceName = "Project 0";
  const databaseName = "Trigger";
  const collectionName = "coustomers";
  const collection = context.services.get(serviceName).db(databaseName).collection(collectionName);

  try {
    const doc = await collection.findOne({ name: "mongodb" });
  } catch (err) {
    console.log("error performing mongodb findOne: ", err.message);
  }
};
