module.exports = {
  comment: {
    name: "Comment",
    type: "string",
    required: true,
    length: {
      min: 4,
      max: 500
    }
  },
  demand: {
    name: "Demand",
    type: "string",
    required: true,
    length: {
      min: 5,
      max: 200
    }
  },
  blog: {
    name: "Blog",
    type: "string",
    required: true,
    length: {
      min: 4,
      max: 2000
    }
  }
}