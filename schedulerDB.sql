-- Active: 1669938776289@@127.0.0.1@3306

CREATE DATABASE scheduler_events;
USE scheduler_events;

CREATE TABLE Events (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    label NVARCHAR(30) NOT NULL,
    dateStart DATETIME NOT NULL,
    dateEnd DATETIME NOT NULL,
    allDay BOOL,
    description NVARCHAR(300),
    status NVARCHAR(20),
    backgroundColor NVARCHAR(7)
);
