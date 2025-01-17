'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Exhibit', [
            {
                exhibit_name: "Masterpieces of the Renaissance",
                date: "2025-03-15",
                time: "18:00-21:00",
                exhibit_descript: "Experience the timeless beauty of Renaissance art, featuring iconic works that shaped the course of history. This exhibit celebrates the profound influence of masters like Michelangelo, Raphael, and da Vinci.",
                exhibit_image: "https://res.cloudinary.com/dspxtzqnw/image/upload/v1734777441/MasterpiecesOfTheRenaissance_c0kwr5.jpg",
                exhibit_address: "Krookskala Gallery, 12 Artistry Lane, Warsaw, Poland",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                exhibit_name: "Impressionism: Colors of Light",
                date: "2025-03-22",
                time: "19:00-22:00",
                exhibit_descript: "Dive into the vivid world of Impressionist art with works inspired by the movement's pioneers. Explore how light, color, and emotion blend to create a new perspective on landscapes and everyday scenes.",
                exhibit_image: "https://res.cloudinary.com/dspxtzqnw/image/upload/v1734777440/ImpressionismColorsOfLight_uzvapl.jpg",
                exhibit_address: "Krookskala Gallery, 12 Artistry Lane, Warsaw, Poland",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                exhibit_name: "Baroque Splendor",
                date: "2025-03-29",
                time: "18:30-21:30",
                exhibit_descript: "Immerse yourself in the drama and grandeur of Baroque art. Featuring works that captivate with their rich details, dynamic compositions, and emotional depth.",
                exhibit_image: "https://res.cloudinary.com/dspxtzqnw/image/upload/v1734777441/BaroqueSplendor_p9wxzo.jpg",
                exhibit_address: "Krookskala Gallery, 12 Artistry Lane, Warsaw, Poland",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                exhibit_name: "Modernism Revisited",
                date: "2025-04-05",
                time: "17:00-20:00",
                exhibit_descript: "Explore the bold innovations of Modernism through groundbreaking works that challenged traditional boundaries and redefined art for the modern age.",
                exhibit_image: "https://res.cloudinary.com/dspxtzqnw/image/upload/v1734777440/ModernismRevisited_cffv4r.webp",
                exhibit_address: "Krookskala Gallery, 12 Artistry Lane, Warsaw, Poland",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                exhibit_name: "Surreal Dreams",
                date: "2025-04-12",
                time: "19:30-22:30",
                exhibit_descript: "Enter a dreamlike world of Surrealist masterpieces that blur the line between reality and imagination. Experience the unexpected through bizarre and thought-provoking art.",
                exhibit_image: "https://res.cloudinary.com/dspxtzqnw/image/upload/v1734777440/SurrealDreams_af1vze.jpg",
                exhibit_address: "Krookskala Gallery, 12 Artistry Lane, Warsaw, Poland",
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Exhibit', {
          exhibit_name: {
            [Sequelize.Op.in]: [
              "Masterpieces of the Renaissance",
              "Impressionism: Colors of Light",
              "Baroque Splendor",
              "Modernism Revisited",
              "Surreal Dreams",
            ],
          },
        });
      },            
};