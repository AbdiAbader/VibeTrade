
import mongoose from "mongoose";
import app from "../../Server/server";

import request from "supertest";

beforeAll(async () => {
mongoose.connect('mongodb+srv://abdi:1111@cluster0.sm9f9b4.mongodb.net/test_may_28?retryWrites=true&w=majority');
});

afterAll(async () => {
await mongoose.connection.close();
});
describe("User Route", () => {
  describe("POST", () => {
    it("should return 200 OK", async () => {
      const response = await request(app).post("").send({
        name: "test",
        email: "alx@test.com",
        password: "12345678",
      });
      expect(response.status).toBe(200);
    });
  });
  
  describe("POST /login", () => {
    it("should return 200 OK", async () => {
      const response = await request(app).post("/login").send({
        email: "alx@test.com",
        password: "12345678",
      });
      expect(response.status).toBe(200);
    });
  });
});
