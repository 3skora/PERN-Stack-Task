import User from "../models/user.model";
import { EUserRole } from "../interfaces/user.interfaces";

const seedDatabase = async () => {
  try {
    const sampleClients = [
      {
        name: "Client 1",
        email: "client1@test.com",
        phoneNumber: "010101010",
        city: "Cairo",
        role: EUserRole.CLIENT,
      },
      {
        name: "Client 2",
        email: "client2@test.com",
        phoneNumber: "011121112",
        city: "October",
        role: EUserRole.CLIENT,
      },
      {
        name: "Client 3",
        email: "client3@test.com",
        phoneNumber: "012364578",
        city: "Cairo",
        role: EUserRole.CLIENT,
      },
      {
        name: "Client 4",
        email: "client4@test.com",
        phoneNumber: "014587963",
        city: "Maadi",
        role: EUserRole.CLIENT,
      },
    ];

    const sampleHelpers = [
      {
        name: "Helper 1",
        email: "helper1@test.com",
        phoneNumber: "0145698712",
        city: "Cairo",
        role: EUserRole.HELPER,
      },
      {
        name: "Helper 2",
        email: "helper2@test.com",
        phoneNumber: "0135478796",
        city: "Maadi",
        role: EUserRole.HELPER,
      },
      {
        name: "Helper 3",
        email: "helper3@test.com",
        phoneNumber: "0147859632",
        city: "October",
        role: EUserRole.HELPER,
      },
      {
        name: "Helper 4",
        email: "helper4@test.com",
        phoneNumber: "0165897423",
        city: "Maadi",
        role: EUserRole.HELPER,
      },
    ];

    const existingUser = await User.findOne({ where: { email: "client1@test.com" } });

    if (existingUser) {
      console.log("Database has already been seeded. Skipping...");
      return;
    }

    await User.bulkCreate([...sampleClients, ...sampleHelpers]);
  } catch (error) {
    console.log("🚀 ~ file: app.ts:27 ~ seedDatabase ~ error:", error);
  }
};

seedDatabase();
