DROP TABLE IF EXISTS potholeVerification;
DROP TABLE IF EXISTS photo;
DROP TABLE IF EXISTS pothole;
DROP TABLE IF EXISTS profile;

CREATE TABLE profile(
                        profileId BINARY(16) NOT NULL,
                        profileAuthenticationToken CHAR(32) NOT NULL,
                        profileEmail VARCHAR(320) NOT NULL,
                        profileFirstName VARCHAR(32) NOT NULL,
                        profileHash CHAR(97) NOT NULL,
                        profileLastName VARCHAR(32) NOT NULL,
                        profileUsername VARCHAR(64) NOT NULL,
                        UNIQUE(profileEmail),
                        UNIQUE(profileUsername),
                        PRIMARY KEY(profileId)
);

CREATE TABLE pothole(
                        potholeId BINARY(16) NOT NULL,
                        potholeProfileId BINARY(16) NOT NULL,
                        potholeDate DATE NOT NULL,
                        potholeDescription VARCHAR(512),
                        potholeLat DECIMAL(8, 6) NOT NULL,
                        potholeLng DECIMAL(9, 6) NOT NULL,
                        potholeSeverity NUMERIC(1) NOT NULL,
                        INDEX(potholeProfileId),
                        FOREIGN KEY(potholeProfileId) REFERENCES profile(profileId),
                        PRIMARY KEY(potholeId)
);

CREATE TABLE photo(
                      photoId BINARY(16) NOT NULL,
                      photoPotholeId BINARY(16) NOT NULL,
                      photoProfileId BINARY(16) NOT NULL,
                      photoDate DATE,
                      photoDescription VARCHAR(512),
                      photoName VARCHAR(32) NOT NULL,
                      photoURL VARCHAR(255) NOT NULL,
                      INDEX(photoProfileId),
                      INDEX(photoPotholeId),
                      FOREIGN KEY(photoPotholeId) REFERENCES pothole(potholeId),
                      FOREIGN KEY(photoProfileId) REFERENCES profile(profileId),
                      PRIMARY KEY(photoId)
);

CREATE TABLE potholeVerification(
                                    potholeVerificationPotholeId BINARY(16) NOT NULL,
                                    potholeVerificationProfileId BINARY(16) NOT NULL,
                                    potholeVerificationDate DATE,
                                    potholeVerificationPhotoURL VARCHAR(255),
                                    INDEX(potholeVerificationPotholeId),
                                    INDEX(potholeVerificationProfileId),
                                    FOREIGN KEY(potholeVerificationPotholeId) REFERENCES pothole(potholeId),
                                    FOREIGN KEY(potholeVerificationProfileId) REFERENCES profile(profileId),
                                    PRIMARY KEY(potholeVerificationPotholeId, potholeVerificationProfileId)
);