// Source: https://buddy.works/tutorials/testing-with-jest-password-authentication-in-mongoose-model

const mongoose = require('mongoose');
const User = require('./../user.model.js');

describe("User Password Authentication", () => {
    it("should generate the same hash given the same password text and salt", () => {
        try {
            let salt = User.generateSalt();
            let hash = User.generateHash("qwertyui1234567*", salt);
            expect(hash).toEqual(User.generateHash("qwertyui1234567*", salt));
        } catch(err) {
            throw new Error(err);
        }
    });

    it("should save a user with hashed_password and salt attributes", async() => {
        try {
            let result = await new User({username: "sam", email: "sam@ed.info", password: 'qwertyui1234567*'}).save();
            expect(Object.keys(result._doc)),toEqual(expect.arrayContaining(['salt', 'hashed_password']));
        } catch(err) {
            throw new Error(err);
        }
    });

    it("should throw an error if the password value is empty", async() => {
        try {
            await new User({
                username: "sam",
                email: "sam@ed.info",
                password: ""
            }).save();
        } catch(err) {
            expect(err.errors.password.message).toEqual("Password is required.");
        }
    });

    it("should throw an error if password length is less than 16", async() => {
        try {
            await new User({
                username: "sam",
                email: "sam@ed.info",
                password: "123"
            }).save();
        } catch(err) {
            expect(err.errors.password.message).toEqual("Password must be at least 16 characters.");
        }
    });

    it("should throw an error if there are no numbers", async() => {
        try {
            await new User({
                username: "sam",
                email: "sam@ed.info",
                password: "qwertyuiop!@#$%^"
            }).save();
        } catch(err) {
            expect(err.errors.password.message).toEqual("Password must contain numbers.");
        }
    });

    it("should throw an error if there are no special characters", async() => {
        try {
            await new User({
                username: "sam",
                email: "sam@ed.info",
                password: "qwertyui12345678"
            }).save();
        } catch(err) {
            expect(err.errors.password.message).toEqual("Password must contain special characters.");
        }
    });

    it("should throw an error if the password starts with a number", async() => {
        try {
            await new User({
                username: "sam",
                email: "sam@ed.info",
                password: "1234567*qwertyui"
            }).save();
        } catch(err) {
            expect(err.errors.password.message).toEqual("Password cannot start with a number.");
        }
    });

    it("should throw an error if the password starts with a special character", async() => {
        try {
            await new User({
                username: "sam",
                email: "sam@ed.info",
                password: "*7654321qwertyui"
            }).save();
        } catch(err) {
            expect(err.errors.password.message).toEqual("Password cannot start with a special character.");
        }
    });

    afterEach(async() => {
        try {
            await User.deleteMany({});
        } catch(err) {
            console.log(err);
        }
    });
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/testUser', {
    useNewUrlParser: true
});

mongoose.connection.on('error', () => {
    throw new Error('unable to connect to database: ')
});

afterAll(async() => {
    try {
        await mongoose.connection.close()
    } catch(err) {
        console.log(err)
    }
});