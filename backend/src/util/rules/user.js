module.exports = {
  username: {
    name: "Username",
    type: "string",
    required: true,
    regex: /^[a-zA-Z0-9_-]{3,30}$/,
    length: {
      min: 3,
      max: 30,
    }
  },
  password: {
    name: "Password",
    type: "string",
    required: true,
    regex: /^[a-zA-Z0-9!@#$%^&*<>(){}[\]:|\\`~,./?+_-]{3,30}$/,
    length: {
      min: 3,
      max: 30
    }
  },
  email: {
    name: "Email",
    type: "string",
    regex: /^.{3,25}@.{3,25}$/,
    length: {
      min: 7,
      max: 40
    }
  },
  school: {
    name: "Email",
    type: "string",
    length: {
      min: 4,
      max: 25
    }
  },
  nickname: {
    name: "Nickname",
    type: "string",
    length: {
      min: 3,
      max: 30
    }
  },
}