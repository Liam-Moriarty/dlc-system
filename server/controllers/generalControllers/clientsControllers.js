import mongoose from "mongoose";
import Client from "../../models/clientsModel.js";
import bcrypt from "bcryptjs";

// SERVER PAGINATE CLIENTS
export const getPaginatedClients = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default 1 if page is not provided
    const limit = parseInt(req.query.limit) || 20; // default 10 if the limit of the clients in the page is not provided

    const startIndex = (page - 1) * limit; // Calculate the start index
    const totalItems = await Client.countDocuments();

    // get the clients based on the pagination
    const clients = await Client.find({}, { password: 0 })
      .sort({ company: 1 })
      .skip(startIndex) // Skip the items based on the start index
      .limit(limit); // Limit the number of items to return

    // convert specific data into lowercase to sort it accordinly
    const client = clients
      .map((item) => ({
        ...item.toObject(), // Convert mongoose document to plain JS object
        company: item.company.toLowerCase(),
        city: item.city.toLowerCase(),
      }))
      .sort((a, b) => a.company.localeCompare(b.company)); // Case-insensitive sort

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

  try {
    // check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such client" });
    }

    const clients = await Client.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    // check if client exists
    if (!clients) {
      return res.status(400).json({ error: "No such client" });
    }

    return res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE CLIENTS
export const addClient = async (req, res) => {
  try {
    const { company, contacts, email, city, password, confirmPassword } =
      req.body;

    const emptyFields = [];
    const fields = [
      "company",
      "contacts",
      "email",
      "city",
      "password",
      "confirmPassword",
    ];

    fields.forEach((field) => {
      if (!req.body[field]) {
        emptyFields.push(field);
      }
    });

    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ message: "Please fill in all the fields", emptyFields });
    }

    // Email validation
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email!!" });
    }

    // Contacts validation: Ensure it is 10 digits and starts with 9
    if (!/^9\d{9}$/.test(contacts)) {
      return res.status(400).json({
        message: "Contacts must be a 10-digit number starting with 9",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password not match",
      });
    }

    const clients = await Client.create({
      company,
      contacts,
      email,
      city,
      password,
      confirmPassword,
    });
    res.status(200).json(clients);
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const value = error.keyValue[field];
      return res.status(400).json({
        message: `Email is already use try another one`,
      });
    }
    res.status(500).json({ message: error.message });
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
