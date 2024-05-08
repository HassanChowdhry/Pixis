DROP DATABASE IF EXISTS photo_gallery;
CREATE DATABASE photo_gallery;
USE photo_gallery;

CREATE TABLE user (
  userID INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  bio VARCHAR(2000) NOT NULL
  -- googleID --add attr,
  -- username,
  -- email,
);

CREATE TABLE photos (
  photoId INT PRIMARY KEY AUTO_INCREMENT,
  source TEXT NOT NULL,
  location VARCHAR(100) NOT NULL,
  caption TEXT NOT NULL,
  userID INT,
  FOREIGN KEY (userID) REFERENCES user(userID)
);

INSERT INTO user
  VALUES
    ("1", "mohammedchowdhry11@gmail.com", "Hassan", "Chowdhry", "Hey there!! Welcome to my Photo Gallery App. We are still under construction."),
    ("2", "hassanchowdhry123@gmail.com", "Muhammad", "Ishtiaq", "Hey there!! Welcome to my Photo Gallery App. We are still under construction. This is my user testing");

INSERT INTO photos (source, location, caption, userID)
  VALUES
    ("https://cdn.britannica.com/17/83817-050-67C814CD/Mount-Everest.jpg", "New York, USA", "Big Mountain", "1"),
    ("https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg", "Water", "Tree next to water", "1"),
    ('https://cdn.lifestyleasia.com/wp-content/uploads/sites/3/2020/11/16190957/photo-1543349689-9a4d426bee8e-1243x900.jpeg', 'Paris,France', 'The eiffal tower also known as big wonder of the world', "1"),
    ('https://tribune-reloaded.s3.amazonaws.com/media/images/2162950-minarepakistanx-1582517159/2162950-minarepakistanx-1582517159.jpg', 'Lahore, Pakistan', 'Minar-e-Pakistan a big landmark of a Pakistan.', "1"),
    ('https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Deosai_%22The_Land_of_Giants%22.jpg/800px-Deosai_%22The_Land_of_Giants%22.jpg', 'Skardu, Pakistan', 'Deosai National Park is the second highest plateau in the world, also known as the land of the giants.', "1"),
    ('https://www.fehmeedakhan.com/wp-content/uploads/2016/08/Passu-Cathedral.jpg', 'Passu, Pakistan', 'The Passu Cathedral (also known as Passu Cones) are beautiful range of mountains, part of the himalayan.', "1"),
    ('https://vid.alarabiya.net/images/2018/04/03/7a451f2d-2257-4d9a-9eb9-358cc333b512/7a451f2d-2257-4d9a-9eb9-358cc333b512_16x9_1200x676.JPG', 'Abu Dhabi, UAE', 'The empty quarter is an uninhabitable part of the desert, with arid dryness and year round drought.', "1"),
    ('https://cdn.shortpixel.ai/spai/q_glossy+ex_1+ret_img+to_webp/https://irfanclicks.com/wp-content/uploads/2021/02/shuweihat-island-abu-dhabi-6-1030x579.jpg', 'Ruwais, UAE', 'Shuweihat island is a small island off the coast and one of the wonders of the world (not really).',"1"),
    ('https://compote.slate.com/images/908ae1e8-b923-44c5-85b4-145b12100b4e.jpg', 'Naran, Pakistan', 'Fairy Meadows, known for being the base camp for the mountain due to its difficult trek to the top.', "2");
