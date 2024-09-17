import request from "supertest";
import { app } from "../../app";
import { setupTestApp } from "../index";

describe("User API", () => {
  beforeAll(async () => {
    await setupTestApp();
  });

  it("should create a new user", async () => {
    const userData = {
      name: "Ahmed Askora",
      email: "ahmedaskora@gmail.com",
      role: "client",
      city: "Cairo",
      phoneNumber: "0123456789",
    };
    const res = await request(app).post("/api/users").send(userData);

    expect(res.status).toBe(201);
    expect(res.body.name).toBe(userData.name);
    expect(res.body.email).toBe(userData.email);
    expect(res.body.role).toBe(userData.role);
  });

  it("should get all users", async () => {
    const res = await request(app).get("/api/users");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get users by city = Cairo", async () => {
    const res = await request(app).get("/api/users").query({ city: "Cairo" });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((user) => {
      expect(user.city).toBe("Cairo");
    });
  });

  it("should edit a user", async () => {
    // First, create a user
    const userData = {
      name: "Ahmed Atef",
      email: "ahmedatef@example.com",
      role: "client",
      city: "Cairo",
      phoneNumber: "9876543210",
    };
    const createRes = await request(app).post("/api/users").send(userData);
    const userId = createRes.body.id;

    // Now, edit the user
    const updatedData = {
      name: "Ahmed Atef Updated",
      email: "ahmedatef50@example.com",
    };
    const res = await request(app).put(`/api/users/${userId}`).send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedData.name);
    expect(res.body.email).toBe(updatedData.email);
  });

  it("should delete a user", async () => {
    // First, create a user
    const userData = {
      name: "Ahmed Askora Deleted",
      email: "askora@example.com",
      role: "client",
      city: "Cairo",
      phoneNumber: "147852963",
    };
    const createRes = await request(app).post("/api/users").send(userData);
    const userId = createRes.body.id;

    // delete the user
    const res = await request(app).delete(`/api/users/${userId}`);

    expect(res.status).toBe(204);

    // Verify the user is deleted
    const getRes = await request(app).get(`/api/users/${userId}`);
    expect(getRes.status).toBe(404);
  });
});
