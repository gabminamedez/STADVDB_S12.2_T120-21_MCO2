SET SQL_SAFE_UPDATES = 0;
SET @@SESSION.sql_mode='ALLOW_INVALID_DATES';

UPDATE listings
SET last_review = str_to_date( last_review, '%Y-%m-%d' );

CREATE TABLE hosts (
	host_id INT PRIMARY KEY,
	host_name VARCHAR(255)
);

INSERT INTO hosts(host_id, host_name)
SELECT DISTINCT host_id, host_name FROM listings;

ALTER TABLE listings DROP COLUMN host_name;

ALTER TABLE listings
ADD FOREIGN KEY (host_id) REFERENCES hosts(host_id);