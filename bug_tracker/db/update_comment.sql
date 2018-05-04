UPDATE comment SET description = $2 WHERE id = $1
returning *;