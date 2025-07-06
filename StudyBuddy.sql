--CREATE DATABASE StudyBuddyDB;

USE StudyBuddyDB;

CREATE TABLE QuestionsAndAnswers (
    QuestionID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Questions NVARCHAR(3000),
    Answers NVARCHAR(3000)
);

--INSERT INTO QuestionsAndAnswers(Questions, Answers)
--VALUES('Explain how data flows from a component’s class to its template. Show an example.', 'Data flows from a component''s class to its template through property binding. You can bind a property of the component class to an element or directive in the template'),
--('What attribute directives are being used in this application? Describe their purpose.', 'Attribute directives modify the appearance or behavior of an element. Examples include ngClass and ngStyle. They are used as attributes in the HTML.'),
--('How does a component have access to a service?', 'When you want a component to use a service, you inject the service into the component''s constructor. Angular''s dependency injection system takes care of providing an instance of the service when the component is created.'),
--('Explain component based archetecture.', 'Component-Based Architecture is a design paradigm where an application is broken down into modular, reusable, and independent components. Each component encapsulates a specific piece of functionality, and these components are then composed to build the entire application. This architectural style promotes modularity, reusability, and maintainability.'),
--('How do you authenticate to your THIRD PARTY API?', 'Authentication with a third-party API typically involves obtaining an access token or API key from the service provider and including that token or key in your HTTP requests. The exact process depends on the authentication mechanism used by the third-party API.'),
--('How do you parse the data that you get from your THIRD PARTY API? What kind of data are you getting back from the API?', 'Parsing data from a third-party API involves extracting relevant information from the response received after making a request to the API. The type of data and how it''s formatted depends on the API and the endpoint you''re interacting with. Common formats include JSON and XML.'),
--('How do you call APIs in Angular?', 'In Angular, you can make HTTP requests to APIs using the Angular HTTPCLIENT module.'),
--('How do you connect the ASP.NET application to the database?', 'Connecting an ASP.NET application to a database involves configuring a data connection, specifying connection details, and using a data access technology to interact with the database.'),
--('What program do you use to manage your database? Can we manage remote dbs using that program?', 'Microsoft Azure is an example of a database used. Regarding managing remote databases, yes, most of these tools allow you to connect to and manage databases that are not on the same machine as the tool itself. When connecting to a remote database, you typically provide connection details such as the server address, port, and credentials.'),
--('Explain how the Entity framework works?', 'Entity Framework (EF) is an Object-Relational Mapping (ORM) framework provided by Microsoft for .NET applications. It enables developers to work with databases using .NET objects and eliminates the need to write raw SQL queries.'),
--('What is a foreign key?', 'A foreign key is a relational database concept that establishes a link or relationship between two tables based on the values of one or more columns. It is a field (or a set of fields) in a database table that refers to the primary key in another table. This relationship between tables is fundamental to maintaining referential integrity in a relational database.');


--CREATE TABLE Favorites (
--    FavoriteID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
--    UserID NVARCHAR(3000),
--    QuestionID INT,
--);

--INSERT INTO Favorites (UserID, QuestionID)
--VALUES (1, 3);

SELECT * FROM QuestionsAndAnswers;
SELECT * FROM Favorites;


--ALTER TABLE Favorites
--ADD AnswerID NVARCHAR(3000);

--ALTER TABLE Favorites
--ALTER COLUMN AnswerID NVARCHAR(3000);

-- Drop the existing Favorites tab
--DROP TABLE Favorites;


--                     **** USE THIS FAVORITE TABLE **** 

-- Create a new Favorites table with foreign key references for QuestionID and AnswerID
--CREATE TABLE Favorites (
--    FavoriteID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
--    UserID NVARCHAR(3000),
--    QuestionID INT,
--    AnswerID INT,
--    FOREIGN KEY (QuestionID) REFERENCES QuestionsAndAnswers(QuestionID),
--    FOREIGN KEY (AnswerID) REFERENCES QuestionsAndAnswers(QuestionID)
--);
