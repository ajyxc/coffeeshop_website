-- This script creates all the tables required by the Comprio backend.

-- Enable the citext (case-insensitive text) extention.
CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


CREATE TABLE company (
  companyId SERIAL PRIMARY KEY,
  name CITEXT NOT NULL UNIQUE,
  address VARCHAR(256) NOT NULL,
  startDate TIMESTAMP NOT NULL,
  isActive BOOLEAN NOT NULL DEFAULT TRUE
);


CREATE TABLE product (
  productId SERIAL PRIMARY KEY,
  companyId INTEGER NOT NULL,
  name VARCHAR(256) NOT NULL,
  description VARCHAR(1024),
  price MONEY NOT NULL,
  pointsCost INTEGER NOT NULL DEFAULT 0,
  calories INTEGER,
  volume INTEGER,
  weight INTEGER,
  isFood BOOLEAN NOT NULL,
  available BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (companyId)
    REFERENCES company (companyId)
    -- If a company is removed, it's products are removed as well.
    ON DELETE CASCADE
);


CREATE TABLE account (
  accountId SERIAL PRIMARY KEY,
  email CITEXT NOT NULL UNIQUE,
  hash VARCHAR NOT NULL,
  name VARCHAR(64) NOT NULL,
  isAdmin BOOLEAN NOT NULL DEFAULT FALSE
);


CREATE TABLE employee (
  accountId INTEGER,
  companyId INTEGER,
  isManager BOOLEAN NOT NULL DEFAULT FALSE,
  isActive BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (accountId, companyId),
  FOREIGN KEY (companyId)
    REFERENCES company (companyId)
    -- If a company is removed, it's employee records are removed as well.
    ON DELETE CASCADE,
  FOREIGN KEY (accountId)
    REFERENCES account (accountId)
    -- If a account is removed, it's employee record is removed as well.
    ON DELETE CASCADE
);


CREATE TABLE customer (
  accountId INTEGER,
  companyId INTEGER,
  points INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (accountId, companyId),
  FOREIGN KEY (accountId)
    REFERENCES account (accountId)
    -- If a account is removed, it's customer record is removed as well.
    ON DELETE CASCADE,
  FOREIGN KEY (companyId)
    REFERENCES company (companyId)
    -- If a company is removed, it's customers are removed as well.
    ON DELETE CASCADE
);


CREATE TABLE purchase (
  purchaseId SERIAL PRIMARY KEY,
  companyId INTEGER NOT NULL,
  employeeId INTEGER NOT NULL,
  -- The customer does not have to have an account.
  customerId INTEGER,
  timestamp TIMESTAMP NOT NULL,
  FOREIGN KEY (companyId)
    REFERENCES company (companyId)
    -- If a company has purchases associated with it, it cannot be removed.
    -- This is to preserve the necessity for customers to see the company
    -- their purchases occurred with.
    ON DELETE RESTRICT,
  FOREIGN KEY (employeeId, companyId)
    REFERENCES employee (accountId, companyId)
    -- An employee cannot be removed if it sold purchases.
    -- Note: the employee should be set to inactive instead.
    ON DELETE RESTRICT,
  FOREIGN KEY (customerId, companyId)
    REFERENCES customer (accountId, companyId)
    -- If the customer is removed, it's purchases are set to anonymous .
    ON DELETE SET NULL
);


CREATE TABLE purchaseItem (
  purchaseId INTEGER,
  productId INTEGER,
  quantity INTEGER NOT NULL,
  unitPrice MONEY NOT NULL,
  pointsUsed INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (purchaseId, productId),
  FOREIGN KEY (purchaseId)
    REFERENCES purchase (purchaseId)
    -- If an purchase is removed, it's purchase items are removed as well.
    ON DELETE CASCADE,
  FOREIGN KEY (productId)
    REFERENCES product (productId)
    -- If an purchase references a product, it cannot be removed.
    ON DELETE RESTRICT
);
