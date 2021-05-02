exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          user_email: "max1234@max.com",
          user_password:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1heDEyMzRAbWF4LmNvbSIsImlhdCI6MTYxOTk3NzgzNSwiZXhwIjoxNjE5OTgxNDM1fQ.-2VfwQFVx0-jj-5WRCxDSTaCZfYSYWDBhoQr8dLPZ5g",
        }, // 1
      ]);
    });
};
