'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Style", [{
      style_name: 'Surrealism',
      style_description: "Surrealism, a revolutionary cultural movement that emerged in Europe after World War I, sought to unlock the unconscious mind and merge dream with reality. Influenced by the Dada movement, Surrealism is best known for its visual artworks and writings that juxtapose unexpected and unconventional imagery. Artists created unnerving, illogical scenes, often rendered with photographic precision, blending everyday objects into fantastical, dreamlike compositions. Strange creatures, bizarre landscapes, and mysterious narratives became hallmarks of the style. The movement's techniques, such as automatic drawing and free association, encouraged the unfiltered expression of the subconscious. André Breton, the movement's leader, described its goal as 'resolving the previously contradictory conditions of dream and reality into an absolute reality, a super-reality.' Surrealism profoundly influenced modern art, literature, and thought, leaving a legacy of innovation and imagination that continues to captivate audiences.",
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      style_name: 'Cubism',
      style_description: "Cubism is an early-20th-century avant-garde art movement that revolutionized European painting and sculpture, and inspired related movements in music, literature and architecture. Cubism has been considered the most influential art movement of the 20th century. The term is broadly used in association with a wide variety of art produced in Paris (Montmartre and Montparnasse) or near Paris (Puteaux) during the 1910s and throughout the 1920s. The movement was pioneered by Pablo Picasso and Georges Braque, joined by Jean Metzinger, Albert Gleizes, Robert Delaunay, Henri Le Fauconnier, and Fernand Léger. One primary influence that led to Cubism was the representation of three-dimensional form in the late works of Paul Cézanne. A retrospective of Cézanne's paintings had been held at the Salon d'Automne of 1904, current works were displayed at the 1905 and 1906 Salon d'Automne, followed by two commemorative retrospectives after his death in 1907.[5] In Cubist artwork, objects are analyzed, broken up and reassembled in an abstracted form—instead of depicting objects from a single viewpoint, the artist depicts the subject from a multitude of viewpoints to represent the subject in a greater context.",
      createdAt: new Date(),
      updatedAt: new Date(),
        }, {
      style_name: 'Impressionism',
      style_description: "Impressionism, a transformative 19th-century art movement, is renowned for its innovative techniques and fresh perspective on visual representation. It is defined by relatively small, thin, yet visible brushstrokes, open compositions, and a keen emphasis on capturing the changing qualities of light. This movement often highlighted ordinary subjects and scenes of everyday life, reflecting the passage of time and the transient effects of light and atmosphere. Impressionist works frequently included a sense of movement, offering a dynamic and immersive experience, and employed unusual visual angles to challenge traditional perspectives. Originating in the 1870s and 1880s with a group of Paris-based artists, including Claude Monet, Pierre-Auguste Renoir, and Edgar Degas, Impressionism gained prominence through independent exhibitions that defied academic conventions. This groundbreaking movement forever altered the trajectory of modern art, influencing countless styles and inspiring new ways of seeing the world.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      style_name: 'Baroque',
      style_description: "Baroque is a style of architecture, music, dance, painting, sculpture and other arts that flourished in Europe from the early 17th century until the 1740s. In the territories of the Spanish and Portuguese empires including the Iberian Peninsula it continued, together with new styles, until the first decade of the 1800s. It followed Renaissance art and Mannerism and preceded the Rococo (in the past often referred to as 'late Baroque') and Neoclassical styles. It was encouraged by the Catholic Church as a means to counter the simplicity and austerity of Protestant architecture, art and music, though Lutheran Baroque art developed in parts of Europe as well.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      style_name: 'Conceptual Art',
      style_description: "Conceptual art, also referred to as conceptualism, is art in which the concept(s) or idea(s) involved in the work take precedence over traditional aesthetic, technical, and material concerns. Some works of conceptual art, sometimes called installations, may be constructed by anyone simply by following a set of written instructions. This method was fundamental to American artist Sol LeWitt's definition of conceptual art, one of the first to appear in print: In conceptual art the idea or concept is the most important aspect of the work. When an artist uses a conceptual form of art, it means that all of the planning and decisions are made beforehand and the execution is a perfunctory affair. The idea becomes a machine that makes the art.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      style_name: 'Expressionism',
      style_description: "Expressionism is a modernist movement, initially in poetry and painting, originating in Germany at the beginning of the 20th century. Its typical trait is to present the world solely from a subjective perspective, distorting it radically for emotional effect in order to evoke moods or ideas. Expressionist artists have sought to express the meaning of emotional experience rather than physical reality. Expressionism developed as an avant-garde style before the First World War. It remained popular during the Weimar Republic, particularly in Berlin. The style extended to a wide range of the arts, including expressionist architecture, painting, literature, theatre, dance, film and music. The term is sometimes suggestive of angst. In a historical sense, much older painters such as Matthias Grünewald and El Greco are sometimes termed expressionist, though the term is applied mainly to 20th-century works. The Expressionist emphasis on individual and subjective perspective has been characterized as a reaction to positivism and other artistic styles such as Naturalism and Impressionism.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      style_name: 'Rococo',
      style_description: "Rococo, also known as Late Baroque, is an exceptionally ornamental and theatrical style of architecture, art, and decoration that emerged in France in the 1730s. Characterized by its asymmetry, scrolling curves, gilding, pastel tones, sculpted moldings, and trompe l'oeil frescoes, Rococo aimed to evoke surprise, movement, and drama. Often described as the final expression of the Baroque movement, Rococo arose as a reaction against the formal and geometric Style Louis XIV, earning the name 'rocaille' or 'rocaille style.' It quickly spread across Europe, influencing regions like northern Italy, Austria, southern Germany, Central Europe, and Russia. Rococo extended beyond architecture into sculpture, furniture, silverware, glassware, painting, music, and theater, bringing its light, playful aesthetic to various forms of art. Although initially secular and used primarily in private residences, Rococo also developed a spiritual dimension, leading to its adoption in church interiors, particularly in Central Europe, Portugal, and South America. This style remains celebrated for its intricate detail and opulent charm.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
        style_name: 'Futurism',
        style_description: "Futurism, an early-20th-century artistic and social movement that originated in Italy, celebrated the dynamic energy of modern life and the transformative power of technology. With a focus on speed, youth, and industrial progress, Futurism glorified innovations like cars, airplanes, and bustling industrial cities as symbols of a new era. The movement's artworks sought to convey motion, energy, and the essence of modernity through fragmented forms, bold colors, and rhythmic compositions. Founders like Filippo Tommaso Marinetti and artists such as Umberto Boccioni and Giacomo Balla explored themes of dynamism and mechanization, rejecting traditional art forms in favor of a revolutionary vision that mirrored the relentless pace of the 20th century. Futurism profoundly influenced subsequent avant-garde movements, leaving a lasting imprint on art, literature, and design.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        style_name: 'Art Nouveau',
        style_description: "Art Nouveau, an influential international style of art, architecture, and design, emerged in the late 19th century as a response to industrialization and a desire to revive craftsmanship. Known for its intricate linear designs, flowing curves, and organic motifs, Art Nouveau often draws inspiration from natural forms such as flowers, plants, and vines. This style seamlessly integrates decorative arts and architecture, with an emphasis on harmony and elegance. Artists and designers like Gustav Klimt, Alphonse Mucha, and Antoni Gaudí contributed to its popularity, creating works that celebrated beauty and nature. Art Nouveau left a lasting legacy, bridging the gap between traditional artistic styles and modernism.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        style_name: 'Abstract Expressionism',
        style_description: "Abstract Expressionism, a groundbreaking post–World War II art movement, emerged in the 1940s in New York City as a defining moment in modern art. This movement is characterized by its focus on spontaneous, automatic, or subconscious creation, allowing artists to explore raw emotion and individual expression. Works often feature bold, gestural marks, dramatic contrasts, and abstract forms that convey intensity and dynamism. Abstract Expressionism encompasses a range of approaches, from the action painting of Jackson Pollock, with his signature drip techniques, to the color field paintings of Mark Rothko, which evoke profound emotional resonance through vast, immersive expanses of color. As the first major American art movement to gain international acclaim, Abstract Expressionism signaled a shift in the art world’s center of gravity from Europe to the United States.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        style_name: 'Realism',
        style_description: "Realism, an artistic movement that originated in France in the mid-19th century, is defined by its commitment to portraying life with authenticity and precision. Rejecting the idealized and often romanticized depictions of earlier art movements, Realism sought to represent the world as it truly was, focusing on ordinary people, their daily lives, and the social realities of the time. With an emphasis on accurate detail and unembellished scenes, Realist artists like Gustave Courbet and Jean-François Millet captured the dignity of labor, the struggles of the working class, and the unvarnished beauty of the natural world. This movement challenged traditional notions of art, paving the way for modern approaches to truth and representation in visual storytelling.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        style_name: 'Pop Art',
        style_description: "Pop Art, which emerged in the mid-20th century, is a vibrant and bold artistic movement that drew inspiration from popular and mass culture. Defined by its incorporation of imagery from advertisements, comic books, consumer products, and everyday objects, Pop Art blurred the boundaries between high art and commercial culture. Often characterized by bright colors, graphic techniques, and a playful yet critical approach to modern life, this style reflected and commented on the rise of consumerism and media influence. Key figures like Andy Warhol, with his iconic Campbell’s Soup Cans, and Roy Lichtenstein, known for his comic-strip-inspired paintings, revolutionized the art world by turning the ordinary into extraordinary. Pop Art remains a significant cultural milestone, influencing art, design, and popular culture globally.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        style_name: 'Minimalism',
        style_description: "Minimalism, a style that arose in the late 1950s and 1960s, is defined by its emphasis on simplicity, clarity, and the elimination of excess. Emerging as a reaction against the emotional intensity of Abstract Expressionism, Minimalist art focuses on the essentials, stripping works down to their core elements. Characterized by clean lines, monochromatic or limited color palettes, and precise geometric shapes, it often conveys a sense of order and tranquility. Minimalism seeks to create an unembellished aesthetic that allows the viewer to engage directly with the materials, space, and form. This style has profoundly influenced not only the visual arts but also architecture, design, and contemporary culture, advocating the principle that 'less is more.'",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        style_name: 'Romanticism',
        style_description: "Romanticism, an artistic movement that emerged in the late 18th century, is characterized by its profound emphasis on emotion, individualism, and the sublime beauty of nature. Rejecting the rationalism of the Enlightenment, Romantic artists sought to evoke intense feelings, often portraying dramatic, atmospheric scenes that captured the grandeur and unpredictability of the natural world. This style celebrated imagination and subjectivity, frequently exploring themes of heroism, the supernatural, and the human connection to the untamed landscapes. With its rich and evocative imagery, Romanticism had a profound influence on literature, music, and visual arts, shaping cultural expressions that resonate with deep emotional impact and philosophical depth.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        style_name: 'Gothic Art',
        style_description: "Gothic Art, which originated in the 12th century and flourished across Europe until the Renaissance, is renowned for its dramatic and ornate aesthetic. Defined by its use of pointed arches, ribbed vaults, and flying buttresses, Gothic architecture emphasized height and light, creating awe-inspiring structures like cathedrals that seemed to reach toward the heavens. This style is marked by intricate detailing, such as carved stonework, gargoyles, and elaborate tracery, as well as a mastery of stained glass that transformed interiors with vibrant, storytelling imagery. Beyond architecture, Gothic Art extended into sculpture, manuscript illumination, and panel painting, often focusing on religious themes and conveying a sense of divine transcendence. Its enduring influence can be seen in the cultural and artistic landscape even today.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        style_name: 'Constructivism',
        style_description: "Constructivism was an influential artistic and architectural movement that emerged in Russia during the early 20th century, flourishing in the wake of the Russian Revolution. Rooted in the idea of art as a tool for societal progress, Constructivism rejected traditional aesthetics in favor of functionality and utility. It emphasized geometric abstraction, precision, and the use of industrial materials such as steel, glass, and concrete. Artists and architects associated with this movement often collaborated to create works that integrated art, design, and technology, reflecting a collective vision of building a modern, equitable society. This approach extended beyond fine art to include architecture, graphic design, film, and propaganda, leaving a profound legacy on modernist movements worldwide.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        style_name: 'Op Art',
        style_description: "Op Art, short for Optical Art, is an artistic movement that emerged in the 1960s, captivating audiences with its innovative use of visual illusions. This style is characterized by its ability to trick the eye, creating dynamic impressions of movement, hidden imagery, or shifting perspectives. It often relies on bold, high-contrast patterns, such as repeating geometric shapes, concentric circles, and grid-like structures. The intricate interplay of lines, colors, and forms engages the viewer’s perception, making the artwork appear to vibrate, shimmer, or pulse with energy. Op Art’s focus on optical phenomena connects art with scientific principles, offering a modern exploration of how we see and interpret visual information. As a revolutionary art form, it left a lasting impact on not only fine art but also fashion, design, and popular culture of the 20th century.",
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Style", {
      style_name: {
        [Sequelize.Op.in]: [
          'Surrealism',
          'Cubism',
          'Impressionism',
          'Baroque',
          'Conceptual Art',
          'Expressionism',
          'Rococo',
          'Futurism',
          'Art Nouveau',
          'Abstract Expressionism',
          'Realism',
          'Pop Art',
          'Minimalism',
          'Romanticism',
          'Gothic Art',
          'Constructivism',
          'Op Art'
        ],
      },
    });
  },  
};