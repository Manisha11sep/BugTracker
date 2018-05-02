select * from comment
where issue_id =  $1 
order by id ASC;