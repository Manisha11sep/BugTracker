DELETE FROM comment WHERE (id = $1)
returning *;