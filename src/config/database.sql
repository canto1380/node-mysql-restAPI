-- show databases;      Listado de DB
-- use nombreDB;        Usar la DB
-- show tables;         Listado de tablas de una DB
-- describe employee    Caracterisitcas de una tabla

create database if not exists companydb;

use companydb;

create table boss (
    idBoss int(11) not null auto_increment,
    name varchar(50) not null,
    surname varchar(40) not null,
    primary key(idBoss)
)

create table departament (
    idDepartament int(11) not null auto_increment,
    departamentName varchar(50) not null,
    idBoss int(11) not null,
    primary key(idDepartament),
    foreign key(idBoss) references boss(idBoss)
)

create table employee (
    idEmployee int(11) not null auto_increment,
    name varchar(50) not null,
    surname varchar(40) not null,
    salary int default null,
    idDepartament int(11) not null,
    primary key (idEmployee),
    foreign key(idDepartament) references departament(idDepartament)
);

insert into boss (name, surname) values
    ('Mario', 'Penalba'),
    ('Maria', 'Perez'),
    ('Federico', 'Adad'),
    ('Lourdes', 'Paz');

    insert into departament (departamentName, idBoss) values
        ('legal', 1),
        ('Contable', 2),
        ('RRHH', 3),
        ('Mantenimiento', 4);


insert into employee values
    (1, 'Alejandro', 'Penalba',  1000, 1),
    (2, 'Maria', 'Zalmo',  2000, 1),
    (3, 'Lourdes', 'Toran',  4000, 2),
    (4, 'Federica', 'Herrera',  1000, 3),
    (5, 'Maria', 'Cossio',  2000, 3),
    (6, 'Agustina', 'Penalba',  4000, 4);
    (7, 'Agustina', 'Ramos',  40000, 5);
