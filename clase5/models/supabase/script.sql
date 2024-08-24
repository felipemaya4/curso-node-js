DROP DATABASE IF EXISTS moviesdb;
CREATE DATABASE moviesdb;
USE moviesdb;

CREATE TABLE movie (
  id uuid PRIMARY KEY DEFAULT (UUID()),
  title varchar(360) NOT NULL,
  Y INT NOT NULL,
  director varchar(360) NOT NULL,
  duration INT NOT NULL,
  poster TEXT NOT NULL,
 rate DECIMAL(2, 1) UNSIGNED NOT NULL
);

CREATE TABLE genre (
   
	id INT AUTO_INCREMENT primary key NOT NULL,
	nombre text NOT NULL UNIQUE
);

CREATE TABLE movie_genre (
	movie_id UUID REFERENCES movie(id),
  	genre_id INT REFERENCES genre(id),
  	PRIMARY KEY (movie_id, genre_id)
);


INSERT INTO genre (nombre) VALUES 
	("DRAMA"),
    ("ACTION"),
    ("CRIME"),
    ("ADVENTURE"),
    ("SCI-FI"),
    ("ROMANCE");

INSERT INTO `movie` (title, Y, director, duration, poster, rate) VALUES (
"The Shawshank Redemption", 1994, "Frank Darabont", 142, "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp", 9.3
),
(
  "The Dark Knight", 2008, "Christopher Nolan", 152, "https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg", 9.0
),
(
 "Inception", 2010, "Christopher Nolan", 148, "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg", 8.8
);

INSERT INTO movie_genre (movie_id, genre_id) VALUES
   ((SELECT id FROM movie WHERE title = "The Shawshank Redemption"), (SELECT id FROM genre WHERE nombre = "DRAMA")),
  ((SELECT id FROM movie WHERE title = "The Dark Knight"), (SELECT id FROM genre WHERE nombre = "DRAMA")),
  ((SELECT id FROM movie WHERE title = "The Dark Knight"), (SELECT id FROM genre WHERE nombre = "ACTION")),
  ((SELECT id FROM movie WHERE title = "The Dark Knight"), (SELECT id FROM genre WHERE nombre = "CRIME")),
  ((SELECT id FROM movie WHERE title = "Inception"), (SELECT id FROM genre WHERE nombre = "ACTION")),
  ((SELECT id FROM movie WHERE title = "Inception"), (SELECT id FROM genre WHERE nombre = "ADVENTURE")),
  ((SELECT id FROM movie WHERE title = "Inception"), (SELECT id FROM genre WHERE nombre = "SCI-FI"));
  
SELECT * FROM movie;

INSERT INTO movie_genre (movie_id, genre_id) VALUES ('dc85538a-0343-4874-82d9-a1cb8683304f',( select id from genre where nombre = 'DRAMA'));