namespace db;

entity Persons {
    firstname: String(100);
    lastname: String(100);
    age: Integer;   
}

entity Pets {
    name: String(100);
    species: String(100);
}