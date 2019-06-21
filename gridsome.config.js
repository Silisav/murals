// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Murals Berlin",
  plugins: [
    {
      use: "@gridsome/source-airtable",
      options: {
        apiKey: process.env.AIRTABLE_KEY,
        baseId: process.env.AIRTABLE_BASE,
        tableName: "Murals",
        typeName: "Mural",
        route: "/murals/:path"
      }
    }
  ]
};
