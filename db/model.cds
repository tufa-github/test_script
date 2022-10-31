namespace db;

entity Persons {
    key firstname: String(100);
    lastname: String(100);
    age: Integer;   
}

entity Pets {
    key name: String(100);
    species: String(100);
}