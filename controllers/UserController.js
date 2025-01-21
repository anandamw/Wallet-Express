const { User } = require("../models/");

module.exports = {
  index: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json({ data: users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  register: async (req, res) => {
    try {
      const { firstName, lastName, email } = req.body;

      if (!firstName || !lastName || !email) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const newUser = await User.create({ firstName, lastName, email });
      res.status(201).json({ data: newUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  edit: async (req, res) => {
    try {
      const { id } = req.params; // Ambil ID dari parameter URL
      const { firstName, lastName, email, password } = req.body; // Ambil data dari body request

      // Cari user berdasarkan ID
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update hanya field yang diberikan
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;
      if (password) user.password = password; // Harus di-hash jika ini adalah password

      // Simpan perubahan ke database
      await user.save();

      // Berikan respons sukses
      res.status(200).json({ data: user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params; // Ambil ID dari parameter URL
      const { firstName, lastName, email, password } = req.body; // Ambil data dari body request

      // Cari user berdasarkan ID
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update hanya field yang diberikan
      const updatedFields = {};
      if (firstName) updatedFields.firstName = firstName;
      if (lastName) updatedFields.lastName = lastName;
      if (email) updatedFields.email = email;
      if (password) {
        // Hash password sebelum menyimpan ke database
        const bcrypt = require("bcrypt");
        const saltRounds = 10;
        updatedFields.password = await bcrypt.hash(password, saltRounds);
      }

      // Perbarui data di database
      await user.update(updatedFields);

      // Kirimkan respons berhasil
      res
        .status(200)
        .json({ message: "User updated successfully", data: user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params; // Ambil ID dari parameter URL

      // Cari user berdasarkan ID
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Hapus user dari database
      await user.destroy();

      // Kirimkan respons berhasil
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};
