DROP TABLE IF EXISTS `Billing_Hours`;
DROP TABLE IF EXISTS `Projects_Employees`;
DROP TABLE IF EXISTS `Employees`;
DROP TABLE IF EXISTS `Projects`;
DROP TABLE IF EXISTS `Addresses`;
DROP TABLE IF EXISTS `Clients`;

CREATE TABLE Clients (
    clientID int (11) auto_increment unique not Null ,
    name varchar(255) not Null, 
    email varchar(320) not Null, 
    phone varchar(15) not Null,
    PRIMARY KEY (`clientID`)
);

CREATE TABLE Addresses (
    addressID int (255) auto_increment unique not Null,
    address varchar(255) not Null,
    isComplete boolean not null default 0,
    dateStarted datetime not Null,
    dateComplete datetime,
    cID int,
    PRIMARY KEY (`addressID`), 
    KEY `Clients_ibfk_1` (`cID`),
    CONSTRAINT `Clients_ibfk_1` foreign key (`cID`) REFERENCES `Clients` (`clientID`)
);

CREATE TABLE Employees (
    employeeID int (11) auto_increment unique not Null,
    name varchar(255) not Null, 
    email varchar(255) not Null, 
    billingRate int(255) default Null,
    isCurrentEmployee boolean not null default 1,
    PRIMARY KEY (`employeeID`)
);

CREATE TABLE Projects (
    projectID int (11) auto_increment unique not Null,
    name varchar(800 ) not Null, 
    dateStarted varchar(255) not Null, 
    dateComplete varchar(255) default Null,
    isComplete boolean not null default 0,
    projectDescription text,
    aID int,
    PRIMARY KEY (`projectID`),
    KEY `Projects_ibfk_1` (`aID`),
    CONSTRAINT `Projects_ibfk_1` foreign key (`aID`) REFERENCES `Addresses` (`addressID`)
);

CREATE TABLE Billing_Hours (
    billingHoursID int (11) auto_increment unique not Null,
    timeIn varchar(255 ) not Null, 
    timeOut varchar(255) not Null,
    descriptionOfWork text,
    eid int,
    pID int UNIQUE,
    PRIMARY KEY (`billingHoursID`),
    KEY `Billing_Hours_ibfk_1` (`eID`),
    KEY `Billing_Hours_ibfk_2` (`pID`),
    CONSTRAINT `Billing_Hours_ibfk_1` foreign key (`eID`) REFERENCES `Employees` (`employeeID`),
    CONSTRAINT `Billing_Hours_ibfk_2` foreign key (`pID`) REFERENCES `Projects` (`projectID`)
);

CREATE TABLE Projects_Employees (
    projectEmployeeID int (11) auto_increment unique not Null,
	pID int,
    eID int,
    PRIMARY KEY (`projectEmployeeID`),
    KEY `Projects_Employees_ibfk_1` (`pID`),
    KEY `Projects_Employees_ibfk_2` (`eID`),
    CONSTRAINT `Projects_Employees_ibfk_1` foreign key (`pID`) REFERENCES `Projects` (`projectID`),
    CONSTRAINT `Projects_Employees_ibfk_2` foreign key (`eID`) REFERENCES `Employees` (`employeeID`)
);


INSERT INTO Clients (name,email,phone) values ('Josephine Darakjy', 'josephine_darakjy@darakjy.org', '810-292-9388');
INSERT INTO Clients (name,email,phone) values ('Art Venere', 'art@venere.org', '856-636-8749');
INSERT INTO Clients (name,email,phone) values ('Lenna Paprocki', 'lpaprocki@hotmail.com', '907-385-4412');



INSERT INTO Addresses (`address`,`isComplete`,`dateStarted`,`dateComplete`,`cID`) values (
    '4 B Blue Ridge Blvd, Brighton, MI',
    'false',
    DATE '2015-11-17',
    DATE '2015-12-17',
     (SELECT clientID FROM Clients WHERE name = 'Josephine Darakjy')
);

INSERT INTO Addresses (`address`,`isComplete`,`dateStarted`,`dateComplete`,`cID`) values (
    '32222 FL Jacksonville2 3HG4',
    'false',
    DATE '2015-11-17',
    DATE '2015-12-17',
     (SELECT clientID FROM Clients WHERE name = 'Art Venere')
);

INSERT INTO Employees (`name`,`email`,`billingRate`,`isCurrentEmployee`) values (
    'Richard Hendricks',
    'Eugene@qwe.com',
    '99',
    'true'
);
INSERT INTO Employees (`name`,`email`,`billingRate`,`isCurrentEmployee`) values (
    'Bertram Gilfoyle',
    'Eugene@qwe.com',
    '99',
    'true'
);

INSERT INTO Projects (`name`,`dateStarted`,`dateComplete`,`isComplete`,`projectDescription`,`aID`) values (
    'OSUstadium',
    DATE '2019-11-17',
    DATE '2019-12-17',
    'false',
    'new stadium',
     (SELECT addressID FROM Addresses WHERE address like 'second street')
);
INSERT INTO Projects (`name`,`dateStarted`,`dateComplete`,`isComplete`,`projectDescription`,`aID`) values (
    'your moms kitchen',
    DATE '2019-11-17',
    DATE '2019-12-17',
    'false',
    'renovate kitchen',
     (SELECT addressID FROM Addresses WHERE address like 'FL')
);

INSERT INTO Billing_Hours (`timeIn`,`timeOut`,`descriptionOfWork`,`eid`,`pid`) values (
    DATE '2019-11-17',
    DATE '2019-12-17',
    'just get started',
    (SELECT employeeID FROM Employees WHERE name = 'Richard Hendricks'),
    (SELECT projectID FROM Projects WHERE name = 'OSUstadium')
);

INSERT INTO Projects_Employees (`pid`,`eid`) values (
    (SELECT projectID FROM Projects WHERE name = 'OSUstadium'),
    (SELECT employeeID FROM Employees WHERE name = 'Richard Hendricks')
);



