drop table if exists candidate_interviews_assignments

create table candidate_interviews_assignments(
  id					serial primary key,	
  candidate_info		json not null,
  breakout_room_info	json not null,
  interview_status_code	varchar(5),
  interview_status_info	json,
  create_w3id			varchar(96) not null,
  created_dt			timestamp with time zone default current_timestamp,
  modify_w3id			varchar(96),
  modified_dt			timestamp
)