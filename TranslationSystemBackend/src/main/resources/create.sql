CREATE TABLE IF NOT EXISTS `user`
(
    `username`        varchar(64) CHARACTER SET utf8 NOT NULL,
    `password_digest` binary(16)                     NOT NULL,
    `status`          int                            NOT NULL,
    `points`          int                            NOT NULL,
    `created`         datetime                       NOT NULL,
    `last_login`      datetime                       NOT NULL,
    `token`           varchar(64)                    NOT NULL,
    PRIMARY KEY (`username`)
);