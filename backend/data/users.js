import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    phoneNumber: "1234567890",
    role: "admin",
  },
  {
    name: "User One",
    email: "userone@example.com",
    password: bcrypt.hashSync("123456", 10),
    phoneNumber: "0987654321",
    role: "engineer",
  },
  {
    name: "User Two",
    email: "usertwo@example.com",
    password: bcrypt.hashSync("123456", 10),
    phoneNumber: "1122334455",
    role: "engineer",
  },
  {
    name: "Supervisor User",
    email: "supervisor@example.com",
    password: bcrypt.hashSync("123456", 10),
    phoneNumber: "2233445566",
    role: "supervisor",
  },
];

export default users;
