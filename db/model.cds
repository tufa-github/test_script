using { cuid } from '@sap/cds/common';
namespace db;

entity Persons: cuid{
    firstname: String(100);
    lastname: String(100);
    age: Integer;   
}

entity Pets: cuid{
    name: String(100);
    species: String(100);
}