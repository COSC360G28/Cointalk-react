DROP TABLE IF EXISTS postLiked;
DROP TABLE IF EXISTS commentLiked;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS coin;
DROP TYPE IF EXISTS post_type;

CREATE TYPE post_type AS ENUM ('text', 'pic');

CREATE TABLE account (
	accountID SERIAL NOT NULL,
	username VARCHAR(20),
	password VARCHAR(30),
	email VARCHAR(50),
	accountScore INT,
	accountAvatarURL VARCHAR(100),
	dateCreated TIMESTAMP,
	admin BOOLEAN,
	PRIMARY KEY (accountId)
);

CREATE TABLE coin (
	coinAbbreviation VARCHAR(10) NOT NULL,
	coinName VARCHAR(30),
	PRIMARY KEY (coinAbbreviation)
);

CREATE TABLE post (
	postID SERIAL NOT NULL,
	postTitle VARCHAR(300),
    PostUserID INT,
	postDate TIMESTAMP,
	postType post_type,
	postText VARCHAR(1000),
	postImageURL VARCHAR(100),
	postScore INT,
	postCoin VARCHAR(10),
	PRIMARY KEY (postID),
	FOREIGN KEY (postUserID) REFERENCES account(accountID) ON UPDATE CASCADE ON DELETE NO ACTION,
	FOREIGN KEY (postCoin) REFERENCES coin(coinAbbreviation) ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE comment (
	commentID SERIAL NOT NULL,
	commentContent VARCHAR(1000),
    commentUserID INT,
	commentScore INT,
	commentDate TIMESTAMP,
	mainPostID INT,
	commentParentID INT,
	PRIMARY KEY (commentID),
	FOREIGN KEY (commentUserID) REFERENCES account(accountID) ON UPDATE CASCADE ON DELETE NO ACTION,
	FOREIGN KEY (mainPostID) REFERENCES post(postID),
	FOREIGN KEY (commentParentID) REFERENCES comment(commentID)
);

CREATE TABLE postLiked ( --any entries in here mean that the post was liked by the account
	accountID INT,
	postID INT,
	FOREIGN KEY (accountID) REFERENCES account(accountID),
	FOREIGN KEY (postID) REFERENCES post(postID)
);

CREATE TABLE commentLiked ( -- any entries in here mean that the comment was liked by the account
	accountID INT,
	commentID INT,
	FOREIGN KEY (accountID) REFERENCES account(accountID),
	FOREIGN KEY (commentID) REFERENCES comment(commentID)
);

INSERT INTO coin(coinName, coinAbbreviation) VALUES ('Ethereum', 'ETH');
INSERT INTO coin(coinName, coinAbbreviation) VALUES ('Bitcoin', 'BTC');
INSERT INTO coin(coinName, coinAbbreviation) VALUES ('Ripple', 'XRP');
INSERT INTO coin(coinName, coinAbbreviation) VALUES ('Neo', 'NEO');

INSERT INTO account(username, password, email, dateCreated, admin) VALUES ('admin', 'admin', 'test@test.com', '2021-03-11 03:21:10', TRUE);
INSERT INTO account(username, password, email, dateCreated, admin) VALUES ('arnold', 'pass', 'arnold@test.com', '2021-03-12 13:13:10', FALSE);
INSERT INTO account(username, password, email, dateCreated, admin) VALUES ('james', '123', 'james@test.com', '2021-03-20 10:36:01', FALSE);
INSERT INTO account(username, password, email, dateCreated, admin) VALUES ('bobby', 'iforgot', 'bobby@test.com', '2021-03-21 19:46:47', FALSE);

INSERT INTO post(postTitle, postText, postUserID, postDate, postType, postScore, postCoin) VALUES('Testing of posts BTC', 'This is a test of the posting system, hopefully it works well in Bitcoin', 1, '2021-03-15 01:58:59', 'text', 3, 'BTC');
INSERT INTO post(postTitle, postText, postUserID, postDate, postType, postScore, postCoin) VALUES('Testing of posts ETH', 'This is a test of the posting system, hopefully it works well in Etherium', 1, '2021-03-15 05:32:12', 'text', 3, 'ETH');
INSERT INTO post(postTitle, postText, postUserID, postDate, postType, postScore, postCoin) VALUES('Newcomer''s Beware!', 'Cryptos are not for everyone and you should be ready to lose money if you''re not careful!', 2, '2021-03-16 09:59:24', 'text', 1, 'BTC');

INSERT INTO comment(commentContent, commentUserID, commentScore, commentDate, mainPostID) VALUES ('Yeah but you can also make a lot of money :D', 3, 5, '2021-03-22 01:06:09', 3);
INSERT INTO comment(commentContent, commentUserID, commentScore, commentDate, mainPostID, commentParentID) VALUES ('YUP', 2, 3, '2021-03-22 04:06:32', 3, 1);
INSERT INTO comment(commentContent, commentUserID, commentScore, commentDate, mainPostID, commentParentID) VALUES ('Absolutely!', 1, 1, '2021-03-22 07:44:22', 3, 1);
INSERT INTO comment(commentContent, commentUserID, commentScore, commentDate, mainPostID, commentParentID) VALUES ('Glad you agree!', 3, 2, '2021-03-23 13:11:54', 3, 2);
INSERT INTO comment(commentContent, commentUserID, commentScore, commentDate, mainPostID) VALUES ('yeah it''s too spooky for me', 4, 0, '2021-03-24 18:33:21', 3);
