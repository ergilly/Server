DROP TABLE addresses;

CREATE TABLE addresses(
    id SERIAL PRIMARY KEY,
    postCode VARCHAR(8),
    addressLines VARCHAR ARRAY
);

