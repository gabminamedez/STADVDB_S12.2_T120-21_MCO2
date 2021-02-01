USE dpuui2kh95t8cclk;

DROP TABLE IF EXISTS listings;
DROP TABLE IF EXISTS hosts;
DROP TABLE IF EXISTS room_types;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS neighbourhoods;
DROP TABLE IF EXISTS neighbourhood_groups;

CREATE TABLE neighbourhood_groups (
	neighbourhood_group_id INT AUTO_INCREMENT,
    neighbourhood_group VARCHAR(255),
    PRIMARY KEY ( neighbourhood_group_id )
);
ALTER TABLE neighbourhood_groups AUTO_INCREMENT=1001;

CREATE TABLE neighbourhoods (
	neighbourhood_id INT AUTO_INCREMENT,
    neighbourhood VARCHAR(255),
    neighbourhood_group_id INT,
    PRIMARY KEY ( neighbourhood_id ),
    FOREIGN KEY ( neighbourhood_group_id ) REFERENCES neighbourhood_groups ( neighbourhood_group_id )
);
ALTER TABLE neighbourhoods AUTO_INCREMENT=2001;

CREATE TABLE locations (
	location_id INT AUTO_INCREMENT,
    latitude DECIMAL(10, 5),
    longitude DECIMAL(10, 5),
    neighbourhood_id INT,
    PRIMARY KEY ( location_id ),
    FOREIGN KEY ( neighbourhood_id ) REFERENCES neighbourhoods ( neighbourhood_id )
);
ALTER TABLE locations AUTO_INCREMENT=3001;

CREATE TABLE hosts (
	host_id INT,
    host_name VARCHAR(255),
    PRIMARY KEY ( host_id )
);

CREATE TABLE room_types (
	room_type_id INT AUTO_INCREMENT,
    room_type VARCHAR(255),
    PRIMARY KEY ( room_type_id )
);
ALTER TABLE room_types AUTO_INCREMENT=4001;

CREATE TABLE listings (
	id INT,
    name VARCHAR(255),
    price DECIMAL(10, 2),
    minimum_nights INT,
    number_of_reviews DECIMAL (10, 2),
    last_review DATE,
    reviews_per_month DECIMAL (10, 2),
    availability_365 INT,
    host_id INT,
    location_id INT,
    room_type_id INT,
    PRIMARY KEY ( id ),
    FOREIGN KEY ( host_id ) REFERENCES hosts ( host_id ),
    FOREIGN KEY ( location_id ) REFERENCES locations ( location_id ),
    FOREIGN KEY ( room_type_id ) REFERENCES room_types ( room_type_id )
);