create table if not exists user (
  id int unsigned not null AUTO_INCREMENT,
  name varchar(8) not null,
  email varchar(255) not null,
  password char(60) not null,
  createdAt timestamp not null default current_timestamp,
  modifiedAt timestamp not null default current_timestamp on update current_timestamp,
  imageUrl varchar(2083) null,
  description varchar(20) not null default '',
  UNIQUE (email),
  primary key (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

create table if not exists userState (
  id int unsigned not null,
  fresh char(36) not null,
  createdAt timestamp not null default current_timestamp on update current_timestamp,
  UNIQUE (fresh),
  foreign key (id) references user(id) on delete cascade on update cascade
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

create table if not exists board (
  id int unsigned not null AUTO_INCREMENT,
  userId int unsigned not null,
  createdAt timestamp not null default current_timestamp,
  content text not null default '',
  foreign key (userId) references user(id) on delete cascade on update cascade,
  primary key (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

create table if not exists boardHashtag(
  boardId int unsigned not null,
  hashtag varchar(10) not null,
  foreign key (boardId) references board(id) on delete cascade on update cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

create table if not exists boardLike(
  boardId int unsigned not null,
  userId int unsigned not null,
  likeOrDislike tinyint unsigned not null default 1,
  foreign key (boardId) references board(id) on delete cascade on update cascade,
  foreign key (userId) references user(id) on delete cascade on update cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

create table if not exists boardImage(
  id int unsigned not null AUTO_INCREMENT,
  boardId int unsigned not null,
  imageUrl varchar(2083) null,
  foreign key (boardId) references board(id) on delete cascade on update cascade,
  primary key (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

create table if not exists boardReply(
  id int unsigned not null AUTO_INCREMENT,
  boardId int unsigned not null,
  userId int unsigned not null,
  content text not null default '',
  foreign key (boardId) references board(id) on delete cascade on update cascade,
  foreign key (userId) references user(id) on delete cascade on update cascade,
  primary key (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

create table if not exists friend(
  userId int unsigned not null,
  friendUserId int unsigned not null,
  foreign key (userId) references user(id) on delete cascade on update cascade,
  foreign key (friendUserId) references user(id) on delete cascade on update cascade,
  primary key (userId, friendUserId)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

create table if not exists userRelation(
  subscribeUserId int unsigned not null,
  publishUserId int unsigned not null,
  createdAt timestamp not null default current_timestamp on update current_timestamp,
  isBlock tinyint not null default 0,
  foreign key (publishUserId) references user(id) on delete cascade on update cascade,
  foreign key (subscribeUserId) references user(id) on delete cascade on update cascade,
  UNIQUE (publishUserId, subscribeUserId)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

create table if not exists notification(
  id int unsigned not null AUTO_INCREMENT,
  subscribeUserId int unsigned not null,
  publishUserId int unsigned not null,
  message TEXT not null,
  isAlert tinyint not null default 0,
  createdAt timestamp not null default current_timestamp,
  modifiedAt timestamp not null default current_timestamp on update current_timestamp,
  foreign key (publishUserId) references user(id) on delete cascade on update cascade,
  foreign key (subscribeUserId) references user(id) on delete cascade on update cascade,
  primary key (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
