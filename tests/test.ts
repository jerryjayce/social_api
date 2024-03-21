import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app";

chai.use(chaiHttp);

let token: string;


describe("Login", () => {
    // Test case 1: Get all users
    it("Login", async () => {
        try {

            // Login and obtain the authentication token
            const data = {
                email: "john@example.com",
                password: "12345678"
            };
            const res: any = await chai.request(app).post("/v1/auth/login").send(data);


            expect(res.status).to.equal(200);
            expect(res.body.data.token).to.be.a("string");
            expect(res.body.error).to.equal(false);
            expect(res.body.message).to.equal("login successful");

            // Extract the token
            token = res.body.data.token;

        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    });
});


describe("User Endpoints", () => {
    // Test case 1: Get all users
    it("should get all users", async () => {

        const res = await chai.request(app).get(`/v1/auth/users`).set("Authorization", `Bearer ${token}`);

        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.a("array");
        expect(res.body.error).to.equal(false);
        expect(res.body.message).to.equal("Success");

    });
});

describe("Post Endpoints", () => {

    // Test case 1: Get all posts for a user
    it("should get all posts for a user", async () => {

        const user_id = 1;
        const res = await chai.request(app).get(`/v1/post/${user_id}`).set("Authorization", `Bearer ${token}`);

        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.a("array");
        expect(res.body.error).to.equal(false);
        expect(res.body.message).to.equal("Success");

    });

    // Test case 2: Create a new post for a user
    it("should create a new post for a user", async () => {

        const new_post = { post: "Test post content" };
        const res = await chai.request(app).post(`/v1/post`).send(new_post).set("Authorization", `Bearer ${token}`);

        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.a("object");
        expect(res.body.error).to.equal(false);
        expect(res.body.message).to.equal("Success");
        expect(res.body.data).to.have.property("post").equal(new_post.post);

    });
});

describe("Comment Endpoints", () => {

    // Test case 1: Add a new comment to a post
    it("should add a new comment to a post", async () => {

        const post_id = 1;
        const new_comment = {
            comment: "test comment",
            post_id: 1
        };

        const res = await chai.request(app).post(`/v1/post/${post_id}/comment`).send(new_comment).set("Authorization", `Bearer ${token}`);

        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.a("object");
        expect(res.body.error).to.equal(false);
        expect(res.body.message).to.equal("Success");
        expect(res.body.data).to.have.property("comment").equal(new_comment.comment);


    });
});
