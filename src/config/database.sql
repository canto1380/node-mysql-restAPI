-- show databases;      Listado de DB
-- use nombreDB;        Usar la DB
-- show tables;         Listado de tablas de una DB
-- describe empleyee    Caracterisitcas de una tabla

create database if not exists companydb;

use companydb;

create table employee (
    id int(11) not null auto_increment,
    name varchar(80) not null,
    salary int default null,
    primary key (id)
);


insert into employee values 
    (1, 'Alejandro', 1000),
    (2, 'Maria', 2000),
    (3, 'Lourdes', 4000);