CREATE TABLE neighbourhoods (
	neighbourhood_id INT AUTO_INCREMENT PRIMARY KEY,
    neighbourhood VARCHAR(255),
    neighbourhood_group VARCHAR(255)
);

INSERT INTO neighbourhoods (neighbourhood, neighbourhood_group) 
SELECT DISTINCT neighbourhood, neighbourhood_group FROM locations;

ALTER TABLE locations ADD COLUMN neighbourhood_id INT,
ADD FOREIGN KEY (neighbourhood_id) REFERENCES neighbourhoods(neighbourhood_id);

UPDATE locations JOIN neighbourhoods USING (neighbourhood)
SET locations.neighbourhood_id = neighbourhoods.neighbourhood_id;

ALTER TABLE locations DROP COLUMN neighbourhood;
ALTER TABLE locations DROP COLUMN neighbourhood_group;