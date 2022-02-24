-- add new client
INSERT INTO Clients (`name`,`email`,`phone`) values (:inputName, :inputEmail, :phone);

-- add new address
INSERT INTO Addresses (`zipCode`,`state`,`city`,`street`,`isComplete`,`dateStarted`,`dateComplete`,`cid`) values (:inputZipCode,:inputState,:inputCity,:inputStreet,:inputIsComplete,:inputDateStarted,:inputDateComplete,:inputCid);

-- add new employee
INSERT INTO Employees (`name`,`email`,`billingRate`,`isCurrentEmployee`) values (:inputName,:inputEmail,:inputBillingRate,:inputIsCurrentEmployee);

-- add new project
INSERT INTO Projects (`name`,`dateStarted`,`dateComplete`,`isComplete`,`projectDescription`,`aid`) values (:inputname, :inputdateStarted, :inputdateComplete, :inputisComplete, :inputprojectDescription, :inputaid);

-- add new billing hours
INSERT INTO Billing_Hours (`timeIn`,`timeOut`,`descriptionOfWork`,`eid`,`pid`) values (:inputtimeIn, :inputtimeOut, :inputdescriptionOfWork, :inputeid, :inputpid);

-- add new client
INSERT INTO Projects_Employees (`pid`,`eid`) values (:inputpid, :inputeid);

--client searching
--search by name
SELECT * FROM Clients where `name` like :userInput;
--search by email
SELECT * FROM Clients where `email` like :userInput;
--search by phone
SELECT * FROM Clients where `phone` like :userInput;
----------------------------------------------how to search and link by address?

--search by address
SELECT * FROM Addresses where `cid` like :userInput;



------------------------------------------------how to search by isComplete?
--Addresses searching
--search by isComplete
SELECT * FROM Addresses where `isComplete` like :userInput;
--search by dateStarted
SELECT * FROM Addresses where `dateStarted` like :userInput;
--search by dateComplete
SELECT * FROM Addresses where `dateComplete` like :userInput;
--search by Projects name
SELECT * FROM Projects where `name` like :userInput;
--search by client name
SELECT * FROM Clients where `name` like :userInput;



--Projects searching
--search by name
SELECT * FROM Projects where `name` like :userInput;
--search by name
SELECT * FROM Projects where `name` like :userInput;
--search by name
SELECT * FROM Projects where `name` like :userInput;
--search by name
SELECT * FROM Projects where `name` like :userInput;
--search by name
SELECT * FROM Projects where `name` like :userInput;



