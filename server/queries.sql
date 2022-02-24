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
    phone varchar(10) not Null,
    PRIMARY KEY (`clientID`)
);

CREATE TABLE Addresses (
    addressID int (255) auto_increment unique not Null,
    zipCode varchar(5) not Null, 
    state varchar(255) not Null, 
    city varchar(255) not Null,
    street int (11) unique not Null , 
    isComplete boolean not null default 0,
    dateStarted datetime not Null,
    dateComplete datetime,
    projectID varchar(255) not Null, 
    cid int,
    PRIMARY KEY (`addressID`),
    KEY `Clients_ibfk_1` (`cid`),
    CONSTRAINT `Clients_ibfk_1` foreign key (`cid`) REFERENCES `Clients` (`clientID`)
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
    aid int,
    PRIMARY KEY (`projectID`),
    KEY `Projects_ibfk_1` (`aid`),
    CONSTRAINT `Projects_ibfk_1` foreign key (`aid`) REFERENCES `Addresses` (`addressID`)
);
CREATE TABLE Billing_Hours (
    billingHoursID int (11) auto_increment unique not Null,
    timeIn varchar(255 ) not Null, 
    timeOut varchar(255) not Null,
    descriptionOfWork text,
    eid int,
    pid int UNIQUE,
    PRIMARY KEY (`billingHoursID`),
    KEY `Billing_Hours_ibfk_1` (`eid`),
    KEY `Billing_Hours_ibfk_2` (`pid`),
    CONSTRAINT `Billing_Hours_ibfk_1` foreign key (`eid`) REFERENCES `Employees` (`employeeID`),
    CONSTRAINT `Billing_Hours_ibfk_2` foreign key (`pid`) REFERENCES `Projects` (`projectID`)
);


CREATE TABLE Projects_Employees (
    projectEmployeeID int (11) auto_increment unique not Null,
	pid int,
    eid int,
    PRIMARY KEY (`projectEmployeeID`),
    KEY `Projects_Employees_ibfk_1` (`pid`),
    KEY `Projects_Employees_ibfk_2` (`eid`),
    CONSTRAINT `Projects_Employees_ibfk_1` foreign key (`pid`) REFERENCES `Projects` (`projectID`),
    CONSTRAINT `Projects_Employees_ibfk_2` foreign key (`eid`) REFERENCES `Employees` (`employeeID`)
);







