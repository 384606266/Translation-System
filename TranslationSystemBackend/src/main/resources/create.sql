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
    value    int unsigned                NOT NULL,
    content  LongBlob,
    PRIMARY KEY (id),
    FOREIGN KEY (user) REFERENCES user (username)
);

CREATE TABLE IF NOT EXISTS access
(
    username varchar(64)  NOT NULL,
    id       int unsigned NOT NULL,
    flag     char         NOT NULL, #标记位，前6位保留，后2位wr
    PRIMARY KEY (username, id),
    FOREIGN KEY (username) REFERENCES user (username),
    FOREIGN KEY (id) REFERENCES file (id)
);