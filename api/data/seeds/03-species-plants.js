exports.seed = async function (knex) {
    await knex("plants").del();
    await knex("species").del();
  
    await knex("species").insert([
      { species: "Fern" }, //1
      { species: "Succulent" }, //2
      { species: "Tree" }, //3
      { species: "Unknown" }, //4
      { species: "Cactus" }, //5
    ]);
    await knex("plants").insert([
      {  //1
        nickname: "My Favorite Fern",
        species_id: 1,
        user_id: 1,
        water_freq: "5",
        img: "/images/recipes/1.jpg",
        baseDate: Date.now()
      },
      {  //2
        nickname: "My Favorite Succy",
        species_id: 2,
        user_id: 1,
        water_freq: "10",
        img: "/images/recipes/1.jpg",
        baseDate: Date.now()
      },
      {  //3
        nickname: "My Favorite idk",
        species_id: 4,
        user_id: 1,
        water_freq: "5",
        img: "/images/recipes/1.jpg",
        baseDate: Date.now()
      },
      {  //4
        nickname: "My Favorite tree",
        species_id: 3,
        user_id: 1,
        water_freq: "5",
        img: "/images/recipes/1.jpg",
        baseDate: Date.now()
      },
    ]);
}