exports = async function() {

  const serviceName = "Trigger";
  const databaseName = "Trigger";
  const collectionName = "customers";
  const collection = context.services.get(serviceName).db(databaseName).collection(collectionName);

  try {
    const doc = await collection.findOne({ name: "mongodb" });
  } catch (err) {
    console.log("error performing mongodb findOne: ", err.message);
  }
};
