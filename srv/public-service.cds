using db from'../db/model';

service PublicService{
  entity Persons as projection on db.Persons;
  entity Pets as projection on db.Pets;
}