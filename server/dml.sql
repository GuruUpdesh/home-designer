-- CREATE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
-- add new client
INSERT INTO Clients (`name`,`email`,`phone`) values (:inputName, :inputEmail, :phone);

-- add new address
INSERT INTO Addresses (`address`,`isComplete`,`dateStarted`,`dateComplete`,`cid`) values (:inputAddress,:inputIsComplete,:inputDateStarted,:inputDateComplete,:inputCid);

-- add new employee
INSERT INTO Employees (`name`,`email`,`billingRate`,`isCurrentEmployee`) values (:inputName,:inputEmail,:inputBillingRate,:inputIsCurrentEmployee);

-- add new project & employee
INSERT INTO Projects_Employees (`pid`,`eid`) values (:inputpid, :inputeid);

-- add new project
INSERT INTO Projects (`name`,`dateStarted`,`dateComplete`,`isComplete`,`projectDescription`,`aid`) values (:inputname, :inputdateStarted, :inputdateComplete, :inputisComplete, :inputprojectDescription, :inputaid);

-- add new billing hour
INSERT INTO Billing_Hours (`timeIn`,`timeOut`,`descriptionOfWork`,`eid`,`pid`) values (:inputtimeIn, :inputtimeOut, :inputdescriptionOfWork, :inputeid, :inputpid);


-- READ ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
-- read clients
SELECT * FROM Clients;

-- read addresses
SELECT * FROM Addresses;

-- read employees
SELECT * FROM Employees;

-- read projects & employees
SELECT * FROM Projects_Employees;

-- read projects
SELECT * FROM Projects;

-- read billing hours
SELECt * FROM Billing_Hours;


-- UPDATE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
-- update client row
UPDATE Clients SET name= :inputName, email= :inputEmail, phone =:inputphone  WHERE clientID = :clientID_from_the_update_form;

-- update address row
UPDATE Addresses SET address= :inputAddress, isComplete= :inputIsComplete, dateStarted= :inputDateStarted, dateComplete= :inputDateComplete  WHERE addressID = :addressID_from_the_update_form;

-- update project row
UPDATE Projects SET name= :inputName, dateStarted= :inputDateStarted, dateComplete= :inputDateComplete, isComplete= :inputIsComplete, projectDescription= :inputProjectDescription WHERE projectID = :projectID_from_the_update_form;

-- update employee row
UPDATE Employee SET name= :inputName, email= :inputEmail, billingRate= :inputBillingRate, isCurrentEmployee= :inputIsCurrentEmployee WHERE employeeID = :employeeID_from_the_update_form;

-- update billing hours row
UPDATE Billing_Hours SET timeIn= :inputTimeIn, timeOut= :inputTimeOut, descriptionOfWork= :inputDescriptionOfWork WHERE billingHoursID = :billingHoursID_from_the_update_form;


-- DELETE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
-- delete client row
DELETE FROM Clients WHERE clientID = :clientID_from_the_update_form;

-- delete addresses row
DELETE FROM Addresses WHERE addressID = :addressID_from_the_update_form;

-- delete employee row
DELETE FROM Employees WHERE employeeID = :employeeID_from_the_update_form;

-- delete project row
DELETE FROM Projects WHERE projectID = :projectID_from_the_update_form;

-- delete billing hours row
DELETE FROM Billing_Hours WHERE billingHoursID = :billingHoursID_from_the_update_form;


-- SEARCH ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
--client searching
--search by name
SELECT * FROM Clients where `name` like :userInput;
--search by email
SELECT * FROM Clients where `email` like :userInput;
--search by phone
SELECT * FROM Clients where `phone` like :userInput;
----------------------------------------------how to search and link by address?
--search by address
SELECT * FROM Addresses where `address` like :userInput;


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
------------------------------------------------how to filter the boolean value?
SELECT * FROM Projects where `isComplete` like :userInput;
--search by name
SELECT * FROM Clients where `name` like :userInput;



--Billing_Hours searching
--search by name
SELECT * FROM descriptionOfWork where `name` like :userInput;
--search by name
SELECT * FROM Projects where `name` like :userInput;
--search by name
SELECT * FROM Employees where `name` like :userInput;