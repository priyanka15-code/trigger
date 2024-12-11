exports = async function (changeEvent) {
  try {
    console.log("Received changeEvent: ", JSON.stringify(changeEvent));

    const serviceName = "Trigger";
    const service = context.services.get(serviceName);

    if (!service) {
      console.log(`Service "${serviceName}" is undefined. Verify service name and deployment.`);
      return;
    }

    const database = "Trigger";
    const collectionName = changeEvent.ns?.coll || "customers"
    if (!collectionName) {
      console.log("Collection name is undefined in the changeEvent.", JSON.stringify(changeEvent));
      return;
    }

    const collection = service.db(database).collection(collectionName);
    const docId = changeEvent.documentKey ? changeEvent.documentKey._id : null;
    if (!docId) {
      console.log("Invalid change event: Missing documentKey or _id", JSON.stringify(changeEvent));
      return;
    }

    switch (changeEvent.operationType) {
      case "insert":
        if (changeEvent.fullDocument) {
          const newDocument = mapDocumentToSchema(changeEvent.fullDocument);
          await collection.insertOne(newDocument);
        } else {
          console.log("Insert event missing fullDocument", JSON.stringify(changeEvent));
        }
        break;
      case "delete":
        await collection.deleteOne({ _id: docId });
        break;
      case "update":
      case "replace":
        if (changeEvent.fullDocument) {
          const updatedDocument = mapDocumentToSchema(changeEvent.fullDocument);
          await collection.replaceOne({ _id: docId }, updatedDocument);
        } else {
          console.log("Update/Replace event missing fullDocument", JSON.stringify(changeEvent));
        }
        break;
      default:
        console.log("Unhandled operationType: ", changeEvent.operationType);
    }
  } catch (err) {
    console.log("Error performing MongoDB write: ", err.message);
  }
};

function mapDocumentToSchema(fullDocument) {
  return {
    name: fullDocument.name || null,
    email: fullDocument.email || null,
    loyaltyPoints: fullDocument.loyaltyPoints || 0,
    purchaseHistory: fullDocument.purchaseHistory || [],
  };
}
