DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS coin;

CREATE TABLE account (
	accountID INT IDENTITY,
	username VARCHAR(20),
	password VARCHAR(30),
	email VARCHAR(50),
	accountScore INT,
	accountAvatarURL VARCHAR(100),
	accountAvatar VARBINARY(MAX),
	dateCreated DATETIME,
	admin BOOLEAN,
	PRIMARY KEY (accountId)
);

CREATE TABLE post (
	postID INT IDENTITY,
	postTitle VARCHAR(300),
	postUser VARCHAR(20),
	postUserID INT,
	postDate DATETIME,
	postType ENUM('text', 'pic'),
	postText VARCHAR(1000),
	postImageURL VARCHAR(100),
	postImage VARBINARY(MAX),
	postScore INT,
	postCoin VARCHAR(10),
	PRIMARY KEY (postID),
	FOREIGN KEY (postUserID) REFERENCES account(accountID) ON UPDATE CASCADE ON DELETE NO ACTION,
	FOREIGN KEY (postCoin) REFERENCES coin(coinAbbreviation) ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE comment (
	commentID INT IDENTITY,
	commentContent VARCHAR(1000),
	commentUser VARCHAR(20),
	commentScore INT,
	commentDate DATETIME,
	mainPostID INT,
	commentParentID INT,
	PRIMARY KEY (commentID),
	FOREIGN KEY (commentUserID) REFERENCES account(accountID) ON UPDATE CASCADE ON DELETE NO ACTION,
	FOREIGN KEY (mainPostID) REFERENCES post(postID),
	FOREIGN KEY (commentParentID) REFERENCES comment(commentID)
);

CREATE TABLE coin (
	coinAbbreviation VARCHAR(10) IDENTITY,
	coinName VARCHAR(30),
	PRIMARY KEY (coinAbbreviation)
);

CREATE TABLE postLiked (
	accountID INT,
	postID INT,
	FOREIGN KEY (accountID) REFERENCES account(accountID),
	FOREIGN KEY (postID) REFERENCES post(postID)
);

CREATE TABLE commentLiked (
	accountID INT,
	commentID INT,
	FOREIGN KEY (accountID) REFERENCES account(accountID),
	FOREIGN KEY (commendID) REFERENCES comment(commentID)
);

INSERT INTO coin(coinName, coinAbbreviation) VALUES ('Ehtherium', 'ETH');
INSERT INTO coin(coinName, coinAbbreviation) VALUES ('Bitcoin', 'BTC');
INSERT INTO coin(coinName, coinAbbreviation) VALUES ('Ripple', 'XRP');
INSERT INTO coin(coinName, coinAbbreviation) VALUES ('Neo', 'NEO');

INSERT INTO account(accountID, username, password, email, dateCreated, admin) VALUES (1, 'admin', 'admin', test@test.com, '2021-03-11 03:21:10', 1);
INSERT INTO account(accountID, username, password, email, dateCreated, admin) VALUES (2, 'arnold', 'pass', arnold@test.com, '2021-03-12 13:13:10', 0);
INSERT INTO account(accountID, username, password, email, dateCreated, admin) VALUES (3, 'james', '123', james@test.com, '2021-03-20 10:36:01', 0);
INSERT INTO account(accountID, username, password, email, dateCreated, admin) VALUES (3, 'bobby', 'iforgot', bobby@test.com, '2021-03-21 19:46:47', 0);

INSERT INTO post(postID, postTitle, postText, postUser, postDate, postType, postText, postScore, postCoin) VALUES(1, 'Testing of posts BTC', 'This is a test of the posting system, hopefully it works well in Bitcoin', 'admin', '2021-03-15 01:58:59', 'text', 3, 'BTC');
INSERT INTO post(postID, postTitle, postText, postUser, postDate, postType, postText, postScore, postCoin) VALUES(1, 'Testing of posts ETH', 'This is a test of the posting system, hopefully it works well in Etherium', 'admin', '2021-03-15 05:32:12', 'text', 3, 'ETH');
INSERT INTO post(postID, postTitle, postText, postUser, postDate, postType, postText, postScore, postCoin) VALUES(1, 'Newcomer\'s Beware!', 'Cryptos are not for everyone and you should be ready to lose money if you\'re not careful!', 'arnold', '2021-03-16 09:59:24', 'text', 1, 'BTC');

INSERT INTO comment(commentID, commentContent, commentUser, commentScore, commentDate, mainPostID) VALUES (1, 'Yeah but you can also make a lot of money :D', 'james', 5, '2021-03-22 01:06:09', 3);
INSERT INTO comment(commentID, commentContent, commentUser, commentScore, commentDate, mainPostID, commentParentID) VALUES (2, 'YUP', 'arnold', 3, '2021-03-22 04:06:32', 3, 1); 
INSERT INTO comment(commentID, commentContent, commentUser, commentScore, commentDate, mainPostID, commentParentID) VALUES (3, 'Absolutely!', 'Admin', 1, '2021-03-22 07:44:22', 3, 1);
INSERT INTO comment(commentID, commentContent, commentUser, commentScore, commentDate, mainPostID, commentParentID) VALUES (4, 'Glad you agree!', 'james', 2, '2021-03-23 13:11:54', 3, 2);
INSERT INTO comment(commentID, commentContent, commentUser, commentScore, commentDate, mainPostID) VALUES (5, 'yeah it\'s too spooky for me', 'bobby', 0, '2021-03-24 18:33:21', 3);