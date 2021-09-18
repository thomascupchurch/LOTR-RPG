DROP TABLE IF EXISTS wizards;
DROP TABLE IF EXISTS hobbits;
DROP TABLE IF EXISTS elves;
DROP TABLE IF EXISTS dwarfs;
DROP TABLE IF EXISTS humans;
DROP TABLE IF EXISTS creatures;



CREATE TABLE wizards (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE hobbits (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    
);

CREATE TABLE elves (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    
);

CREATE TABLE dwarfs (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE humans (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE creatures (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);