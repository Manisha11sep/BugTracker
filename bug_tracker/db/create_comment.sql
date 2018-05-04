INSERT INTO comment(description,issue_id, posted_by) VALUES ( $1, $2, $3) 
returning *;