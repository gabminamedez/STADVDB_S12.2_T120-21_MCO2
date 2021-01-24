CREATE TABLE locations (
	location_id INT AUTO_INCREMENT PRIMARY KEY,
	neighbourhood_group VARCHAR(255),
    neighbourhood VARCHAR(255),
    latitude DECIMAL(10, 5),
    longitude DECIMAL(10, 5)
);

INSERT INTO locations(neighbourhood_group, neighbourhood, latitude, longitude)
SELECT neighbourhood_group, neighbourhood, latitude, longitude FROM listings;

ALTER TABLE listings DROP COLUMN neighbourhood_group;
ALTER TABLE listings DROP COLUMN neighbourhood;
ALTER TABLE listings DROP COLUMN latitude;
ALTER TABLE listings DROP COLUMN longitude;

ALTER TABLE listings ADD COLUMN location_id INT AUTO_INCREMENT,
ADD FOREIGN KEY (location_id) REFERENCES locations(location_id);