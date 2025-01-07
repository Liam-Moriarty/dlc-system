import Admin from "../../models/adminSchema.js";

// Paginated Admin
export const paginatedAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const startIndex = (page - 1) * limit;
    const totalItems = await Admin.countDocuments();

    const admins = await Admin.find()
      .sort({ name: 1 })
      .skip(startIndex)
      .limit(limit);

    // mapping thru the admin documents and excluding
    // password, id and updatedAt fields
    const admin = admins
      .map((item) => {
        const { password, updatedAt, ...adminWithoutPassword } =
          item.toObject();
        return {
          ...adminWithoutPassword,
          name: item.name.toLowerCase(),
          username: item.username.toLowerCase(),
          email: item.email.toLowerCase(),
          role: item.role.toLowerCase(),
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    res.status(200).json({
      status: "Success",
      results: {
        totalItems,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        admin,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Failed to show admin data please try again",
    });
  }
};

// Delete Admin
export const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findByIdAndDelete(id);

    if (!admin) {
      return res.status(404).json({ message: "No such admin" });
    }

    res.status(200).json({ status: "Success", results: admin });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to delete admin please try again",
    });
  }
};

// Get All Admins
export const getAdmins = async (req, res) => {
  try {
    const admin = await Admin.find({});

    res.status(200).json({ status: "Success", results: admin });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Failed to show admin data please try again",
    });
  }
};
