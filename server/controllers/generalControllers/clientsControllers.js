import mongoose from "mongoose";
import Client from "../../models/clientsModel.js";
import { validationResult } from "express-validator";

// DELETE CLIENT
export const deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    const clients = await Client.findByIdAndDelete(id);

    // fire this if we cant see any id
    if (!clients) {
      return res.status(404).json({ error: "No such client" });
    }

    res.status(200).json({ message: "Client deleted successfully", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE CLIENT
export const updateClient = async (req, res) => {
  const { id } = req.params;

  const errors = validationResult(req); // check first for validation before updating
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    // check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such client" });
    }

    const clients = await Client.findByIdAndUpdate(id, { ...req.body });

    // check if client exists
    if (!clients) {
      return res.status(400).json({ error: "No such client" });
    }

    return res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SERVER PAGINATE CLIENTS
export const getPaginatedClients = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default 1 if page is not provided
    const limit = parseInt(req.query.limit) || 50; // default 10 if the limit of the clients in the page is not provided

    const startIndex = (page - 1) * limit; // Calculate the start index
    const totalItems = await Client.countDocuments();

    // get the clients based on the pagination
    const clients = await Client.find()
      .skip(startIndex) // Skip the items based on the start index
      .limit(limit) // Limit the number of items to return
      .sort({ company: 1 });

    // convert specific data into lowercase to sort it accordinly
    const client = clients.map((item) => ({
      ...item.toObject(), // Convert mongoose document to plain JS object
      company: item.company.toLowerCase(), // Convert the field to lowercase
      city: item.city.toLowerCase(),
    }));

    res.json({
      totalItems, // Total number of items
      currentPage: page, // Current page number
      totalPages: Math.ceil(totalItems / limit), // Total number of pages
      client, // Items for the current page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE CLIENTS
export const addClient = async (req, res) => {
  const { company, contacts, email, city } = req.body;

  const errors = validationResult(req); // Check for validation errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const clients = await Client.create({ company, contacts, email, city });
    res.status(200).json(clients);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// EXTRAS

// GET ALL CLIENTS DATA
export const getClients = async (req, res) => {
  try {
    const clients = await Client.find({}).sort({ company: 1 });
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
