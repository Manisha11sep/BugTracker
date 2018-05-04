INSERT INTO issue (name,description,creater_id,last_updated) VALUES ( $1, $2, $3, $4)
returning *;