CREATE TABLE IF NOT EXISTS user
(
    username        varchar(64)  NOT NULL,
    password_digest binary(16)   NOT NULL,
    status          int unsigned NOT NULL,
    points          int unsigned NOT NULL,
    created         datetime     NOT NULL,
    last_login      datetime     NOT NULL,
    token           varchar(64)  NOT NULL,
    PRIMARY KEY (username)
);

CREATE TABLE IF NOT EXISTS file
(
    id       int unsigned AUTO_INCREMENT NOT NULL,
    filename varchar(64)                 NOT NULL,
    user     varchar(64)                 NOT NULL,
    cost     int unsigned                NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user) REFERENCES user (username)
)character set = utf8;

CREATE TABLE IF NOT EXISTS slice
(
    id      int unsigned        NOT NULL,
    file    int unsigned        NOT NULL,
    content blob NOT NULL,
    PRIMARY KEY (id, file),
    FOREIGN KEY (file) REFERENCES file (id)
);