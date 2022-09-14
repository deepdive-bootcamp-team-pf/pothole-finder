DROP TABLE IF EXISTS verification;
DROP TABLE IF EXISTS photo;
DROP TABLE IF EXISTS pothole;
DROP TABLE IF EXISTS user;

CREATE TABLE user(
    userId BINARY(16) NOT NULL,
    userAuthenticationToken CHAR(32),
    userEmail VARCHAR(320) NOT NULL,
    userHash CHAR(97) NOT NULL,
    userUsername VARCHAR(64) NOT NULL,
    UNIQUE(userEmail),
    UNIQUE(userUsername),
    PRIMARY KEY(userId)
);
CREATE TABLE pothole(
    potholeId BINARY(16) NOT NULL,
    potholeUserId BINARY(16) NOT NULL,
    potholeDate DATE NOT NULL,
    potholeDescription VARCHAR(512),
    potholeLat DECIMAL(8, 6) NOT NULL,
    potholeLng DECIMAL(9, 6) NOT NULL,
    potholeSeverity NUMERIC(1) NOT NULL,
    INDEX(potholeUserId),
    FOREIGN KEY(potholeUserId) REFERENCES user(userId),
    PRIMARY KEY(potholeId)
);
CREATE TABLE photo(
    photoId BINARY(16) NOT NULL,
    photoPotholeId BINARY(16) NOT NULL,
    photoUserId BINARY(16) NOT NULL,
    photoDate DATE,
    photoDescription VARCHAR(512),
    photoName VARCHAR(32) NOT NULL,
    photoURL VARCHAR(255) NOT NULL,
    INDEX(photoUserId),
    INDEX(photoPotholeId),
    FOREIGN KEY(photoPotholeId) REFERENCES pothole(potholeId),
    FOREIGN KEY(photoUserId) REFERENCES user(userId),
    PRIMARY KEY(photoId)
);
CREATE TABLE verification(
    verificationPotholeId BINARY(16) NOT NULL,
    verificationUserId BINARY(16) NOT NULL,
    verificationDate DATE,
    INDEX(verificationPotholeId),
    INDEX(verificationUserId),
    FOREIGN KEY(verificationPotholeId) REFERENCES pothole(potholeId),
    FOREIGN KEY(verificationUserId) REFERENCES user(userId),
    PRIMARY KEY(
        verificationPotholeId,
        verificationUserId
    )
);