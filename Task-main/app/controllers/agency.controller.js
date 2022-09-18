const Agency = require("../models/Agency");
const Client = require("../models/client");
var moment = require("moment");

exports.createAgencyAndClient = async (req, res) => {
  try {
    if (
      !req.body.AgencyId ||
      !req.body.Name ||
      !req.body.Address1 ||
      !req.body.State ||
      !req.body.City ||
      !req.body.PhoneNumber ||
      !req.body.ClientId ||
      !req.body.TotalBill ||
      !req.body.email
    ) {
      res.status(500).send({ message: "All Fileds are Required" });
    }
    const agency = new Agency({
      AgencyId: req.body.AgencyId,
      Name: req.body.Name,
      Address1: req.body.Address1,
      Address2: req.body.Address2,
      State: req.body.State,
      City: req.body.City,
      PhoneNumber: req.body.PhoneNumber,
    });
    let data = await agency.save();
    if (data) {
      const client = new Client({
        ClientId: req.body.ClientId,
        AgencyId: data._id,
        Name: req.body.clientName,
        email: req.body.email,
        PhoneNumber: req.body.clientPhoneNumber,
        TotalBill: req.body.TotalBill,
      });
      let clientData = await client.save();
      if (clientData) {
        res.status(200).send({ message: "Successfully Saved.." });
      }
    } else {
      res.status(500).send({ message: "Something Went Error!" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updateClient = async (req, res) => {
  try {
    let id = req.query.clientId;
    if (!id) {
      res.status(400).send({ message: "clientId is required" });
      return;
    }
    let data = await Client.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) {
      res.status(404).send({ message: "Client not Found" });
    }
    res.status(200).send({ message: "Update", data: data });
  } catch (error) {
    console.log(error);
  }
};

exports.getClientDetails = async (req, res) => {
  try {
    //let data = await Client.find().sort({ TotalBill: -1 }).aggregate()
    let dd = await Client.aggregate([
      {
        $lookup: {
          from: "agencies",
          foreignField: "_id",
          localField: "AgencyId",
          as: "client_info",
        },
      },
      {
        $sort: { TotalBill: -1 },
      },
      {
        $unwind: "$client_info",
      },
    ]).limit(10);
    res.status(200).send({ message: "Update", data: dd });
  } catch (error) {
    console.log(error);
  }
};
