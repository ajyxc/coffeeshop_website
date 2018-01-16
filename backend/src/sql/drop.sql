-- This script drops all tables used by the Comprio backend.
-- WARNING: This will destroy data if the tables already exist!

-- Drop all tables if they exist
DROP TABLE IF EXISTS purchaseItem CASCADE;
DROP TABLE IF EXISTS purchase CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS employee CASCADE;
DROP TABLE IF EXISTS customer CASCADE;
DROP TABLE IF EXISTS account CASCADE;
DROP TABLE IF EXISTS company CASCADE;
