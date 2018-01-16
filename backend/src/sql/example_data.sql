-- Companies
insert into company (name, address, startDate, isActive) values ('Boulevard Roasting Co.', '70782 West Broadway', '10/31/2015', false);
insert into company (name, address, startDate, isActive) values ('Revolver', '4261 Powell St.', '1/26/2016', false);
insert into company (name, address, startDate, isActive) values ('Thierry', '6 Commercial Dr.', '6/30/2016', false);
insert into company (name, address, startDate, isActive) values ('Bel Cafe', '18 Georgia St.', '10/24/2015', true);
insert into company (name, address, startDate, isActive) values ('Medina', '8 W 16th Ave.', '10/30/2015', false);

-- Products
insert into product (companyId, name, description, price, pointsCost, calories, volume, weight, isFood, available) values (1, 'Latte', 'Espresso with milk', '$3.94', 500, 80, 42, 90, false, true);
insert into product (companyId, name, description, price, pointsCost, calories, volume, weight, isFood, available) values (2, 'Bagel', 'Glyburide', '$1.22', 300, 22, 85, 54, true, false);
insert into product (companyId, name, description, price, pointsCost, calories, volume, weight, isFood, available) values (3, 'Latte', 'Berberis Vulgaris', '$9.54', 300, 66, 86, 45, false, false);
insert into product (companyId, name, description, price, pointsCost, calories, volume, weight, isFood, available) values (4, 'Flat White', 'Metoclopramide', '$2.29', 300, 18, 28, 15, false, true);
insert into product (companyId, name, description, price, pointsCost, calories, volume, weight, isFood, available) values (5, 'Espresso', 'Lamb', '$8.39', 500, 79, 67, 98, false, true);
insert into product (companyId, name, description, price, pointsCost, calories, volume, weight, isFood, available) values (1, 'Flat White', 'Espresso with more milk', '$2.50', 300, 18, 28, 15, false, true);
insert into product (companyId, name, description, price, pointsCost, calories, volume, weight, isFood, available) values (1, 'Bagel', 'Warm bun', '$2.50', 400, 65, 34, 75, true, true);
insert into product (companyId, name, description, price, pointsCost, calories, volume, weight, isFood, available) values (1, 'Cappuccino', 'Espresso with cream', '$4.50', 500, 65, 44, 75, false, true);
insert into product (companyId, name, description, price, pointsCost, calories, volume, weight, isFood, available) values (1, 'Green Tea Latte', 'Espresso with green tea', '$4.35', 500, 80, 54, 85, false, true);
insert into product (companyId, name, description, price, pointsCost, calories, volume, weight, isFood, available) values (1, 'Green Tea Lemonade', 'Lemonade with green tea', '$2.35', 500, 60, 34, 85, false, true);
insert into product (companyId, name, description, price, pointsCost, calories, volume, weight, isFood, available) values (1, 'Steamed milk', 'hot milk', '$2.35', 400, 30, 40, 65, false, true);
insert into product (companyId, name, description, price, pointsCost, calories, volume, weight, isFood, available) values (1, 'Earl Grey Tea', 'earl grey tea', '$1.75', 300, 30, 40, 65, false, true);
insert into product (companyId, name, description, price, pointsCost, calories, volume, weight, isFood, available) values (1, 'Cheesecake', 'American cheesecake', '$4.50', 500, 85, 34, 55, true, true);
insert into product (companyId, name, description, price, pointsCost, calories, volume, weight, isFood, available) values (1, 'Tiramisu', 'Tiramisu', '$4.75', 500, 95, 34, 55, true, true);

-- Accounts
insert into account (email, hash, name, isAdmin) values ('lkelley0@apache.org', 'SasdfDaaggrtrsdF', 'Kelley', false);
insert into account (email, hash, name, isAdmin) values ('pkim1@qq.com', 'SDasdF', 'Kim', false);
insert into account (email, hash, name, isAdmin) values ('kmyers2@naver.com', 'xbvc29cxvb8fr', 'Myers', true);
insert into account (email, hash, name, isAdmin) values ('rhowell3@mail.ru', '19jk34sad', 'Howell', false);
insert into account (email, hash, name, isAdmin) values ('lroberts4@istockphoto.com', 'zdfmdm5e', 'Roberts', true);

-- Employees
insert into employee (accountId, companyId, isManager, isActive) values (1, 1, true, true);
insert into employee (accountId, companyId, isManager, isActive) values (2, 2, false, true);
insert into employee (accountId, companyId, isManager, isActive) values (3, 3, false, true);
insert into employee (accountId, companyId, isManager, isActive) values (4, 4, false, false);
insert into employee (accountId, companyId, isManager, isActive) values (5, 5, false, false);
insert into employee (accountId, companyId, isManager, isActive) values (1, 2, true, true);
insert into employee (accountId, companyId, isManager, isActive) values (1, 3, true, true);
insert into employee (accountId, companyId, isManager, isActive) values (1, 4, true, true);
insert into employee (accountId, companyId, isManager, isActive) values (1, 5, true, true);

-- Customers
insert into customer (accountId, companyId, points) values (1, 1, 300);
insert into customer (accountId, companyId, points) values (2, 2, 36);
insert into customer (accountId, companyId, points) values (3, 3, 17);
insert into customer (accountId, companyId, points) values (4, 4, 100);
insert into customer (accountId, companyId, points) values (5, 5, 72);
insert into customer (accountId, companyId, points) values (2, 1, 400);
insert into customer (accountId, companyId, points) values (1, 2, 200);
insert into customer (accountId, companyId, points) values (1, 3, 500);
insert into customer (accountId, companyId, points) values (1, 4, 220);
insert into customer (accountId, companyId, points) values (1, 5, 1100);

-- Purchases
insert into purchase (companyId, employeeId, customerId, timestamp) values (1, 1, 1, '10/25/2015');
insert into purchase (companyId, employeeId, customerId, timestamp) values (2, 2, 2, '11/25/2015');
insert into purchase (companyId, employeeId, customerId, timestamp) values (3, 3, 3, '12/27/2015');
insert into purchase (companyId, employeeId, customerId, timestamp) values (4, 4, 4, '12/1/2016');
insert into purchase (companyId, employeeId, customerId, timestamp) values (5, 5, 5, '12/2/2016');
insert into purchase (companyId, employeeId, customerId, timestamp) values (1, 1, 1, '11/25/2015');
insert into purchase (companyId, employeeId, customerId, timestamp) values (1, 1, 2, '11/25/2016');
insert into purchase (companyId, employeeId, customerId, timestamp) values (2, 1, 1, '10/26/2015');
insert into purchase (companyId, employeeId, customerId, timestamp) values (3, 1, 1, '10/27/2015');
insert into purchase (companyId, employeeId, customerId, timestamp) values (4, 1, 1, '10/28/2015');
insert into purchase (companyId, employeeId, customerId, timestamp) values (5, 1, 1, '10/29/2015');

-- Purchase Items
insert into purchaseItem (purchaseId, productId, quantity, unitPrice, pointsUsed) values (1, 1, 5, '$3.13', 500);
insert into purchaseItem (purchaseId, productId, quantity, unitPrice, pointsUsed) values (1, 6, 5, '$2.00', 500);
insert into purchaseItem (purchaseId, productId, quantity, unitPrice, pointsUsed) values (2, 2, 91, '$1.21', 0);
insert into purchaseItem (purchaseId, productId, quantity, unitPrice, pointsUsed) values (3, 3, 94, '$9.44', 0);
insert into purchaseItem (purchaseId, productId, quantity, unitPrice, pointsUsed) values (4, 4, 75, '$6.10', 0);
insert into purchaseItem (purchaseId, productId, quantity, unitPrice, pointsUsed) values (5, 5, 67, '$8.26', 100);
insert into purchaseItem (purchaseId, productId, quantity, unitPrice, pointsUsed) values (6, 1, 3, '$2.63', 0);
insert into purchaseItem (purchaseId, productId, quantity, unitPrice, pointsUsed) values (6, 7, 3, '$1.67', 0);
insert into purchaseItem (purchaseId, productId, quantity, unitPrice, pointsUsed) values (7, 6, 3, '$1.67', 0);
insert into purchaseItem (purchaseId, productId, quantity, unitPrice, pointsUsed) values (7, 7, 1, '$1.25', 0);
insert into purchaseItem (purchaseId, productId, quantity, unitPrice, pointsUsed) values (1, 9, 1, '$0', 0);