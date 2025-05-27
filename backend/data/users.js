import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    phoneNumber: "1234567890",
    role: "admin",
    notifications: [
      {
        message: "Welcome to your test site portal dashboard!",
        type: "info",
        read: false,
      },
    ],
  },
  {
    name: "User One",
    email: "userone@example.com",
    password: bcrypt.hashSync("123456", 10),
    phoneNumber: "0987654321",
    role: "engineer",
    notifications: [
      {
        message: "Welcome to your test site portal dashboard!",
        type: "info",
        read: false,
      },
    ],
  },
  {
    name: "User Two",
    email: "usertwo@example.com",
    password: bcrypt.hashSync("123456", 10),
    phoneNumber: "1122334455",
    role: "engineer",
    notifications: [
      {
        message: "Welcome to your test site portal dashboard!",
        type: "info",
        read: false,
      },
    ],
  },
  {
    name: "Supervisor User",
    email: "supervisor@example.com",
    password: bcrypt.hashSync("123456", 10),
    phoneNumber: "2233445566",
    role: "supervisor",
    notifications: [
      {
        message: "Welcome to your test site portal dashboard!",
        type: "info",
        read: false,
      },
    ],
  },
];

export default users;
