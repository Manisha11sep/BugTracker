select * from issue
where name iLIKE CONCAT('%',$1,'%');