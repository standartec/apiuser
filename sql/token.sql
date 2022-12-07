CREATE TABLE onecart.token (
	id INT auto_increment NOT NULL,
	hash varchar(255) NULL,
	username varchar(100) NULL,
	CONSTRAINT token_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;
