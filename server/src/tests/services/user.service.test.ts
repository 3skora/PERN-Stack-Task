import UserService from "../../services/user.service";
import User from "../../models/user.model";
import { EUserRole, UserCreationAttributes } from "../../interfaces/user.interfaces";

// Mock the User model
jest.mock("../../models/user.model");

describe("User Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new user", async () => {
    const userData: UserCreationAttributes = {
      name: "Ahmed Askora",
      email: "ahmedaskora@gmail.com",
      role: EUserRole.CLIENT,
      city: "Cairo",
      phoneNumber: "0123456789",
    };

    // Mock the create function
    (User.create as jest.Mock).mockResolvedValue(userData);

    const user = await UserService.createUser(userData);

    expect(User.create).toHaveBeenCalledWith(userData);
    expect(user).toEqual(userData);
  });

  test("should find all users", async () => {
    const users = [
      {
        name: "Ahmed Askora",
        email: "ahmedaskora@gmail.com",
        role: EUserRole.CLIENT,
        city: "Cairo",
        phoneNumber: "0123456789",
      },
      {
        name: "Helper 1",
        email: "helper1@gmail.com",
        role: EUserRole.HELPER,
        city: "Cairo",
        phoneNumber: "0123456789",
      },
    ];

    const query = {};

    // Mock the findAll function
    (User.findAll as jest.Mock).mockResolvedValue(users);

    const foundUsers = await UserService.getUsers(query);

    expect(User.findAll).toHaveBeenCalledWith({ where: query });
    expect(foundUsers).toEqual(users);
  });

  test("should find users by city", async () => {
    const users = [
      {
        name: "Ahmed Askora",
        email: "ahmedaskora@gmail.com",
        role: EUserRole.CLIENT,
        city: "Cairo",
        phoneNumber: "0123456789",
      },
      {
        name: "Helper 1",
        email: "helper1@gmail.com",
        role: EUserRole.HELPER,
        city: "Cairo",
        phoneNumber: "0123456789",
      },
      {
        name: "Client 1",
        email: "client@gmail.com",
        role: EUserRole.HELPER,
        city: "Maadi",
        phoneNumber: "0123456789",
      },
    ];

    const expectedUsers = [
      {
        name: "Ahmed Askora",
        email: "ahmedaskora@gmail.com",
        role: EUserRole.CLIENT,
        city: "Cairo",
        phoneNumber: "0123456789",
      },
      {
        name: "Helper 1",
        email: "helper1@gmail.com",
        role: EUserRole.HELPER,
        city: "Cairo",
        phoneNumber: "0123456789",
      },
    ];

    const query = { city: "Cairo" };

    // Mock the findAll function to filter users by city
    (User.findAll as jest.Mock).mockImplementation(({ where }) => {
      return users.filter((user) => user.city === where.city);
    });

    const foundUsers = await UserService.getUsers(query);

    expect(User.findAll).toHaveBeenCalledWith({ where: query });
    expect(foundUsers).toEqual(expectedUsers);
  });

  test("should find a user by id", async () => {
    const user = {
      name: "Ahmed Askora",
      email: "ahmedaskora@gmail.com",
      role: EUserRole.CLIENT,
      city: "Cairo",
      phoneNumber: "0123456789",
    };

    // Mock the findByPk function
    (User.findByPk as jest.Mock).mockResolvedValue(user);

    const foundUser = await UserService.getUserById(1);

    expect(User.findByPk).toHaveBeenCalledWith(1);
    expect(foundUser).toEqual(user);
  });
});
