## Entities
### Profile
* profileId (primary key)
* profileAuthenticationToken
* profileEmail
* profileFirstName
* profileLastName
* profileUsername
* profileHash

### Pothole
* potholeId (primary key)
* potholeProfileId (foreign key)
* potholeLat
* potholeLng
* potholeSeverity
* potholeDateTime
* potholeDescription

### Photo
* photoId (primary key)
* photoProfileId (foreign key)
* photoPotholeId (foreign key)
* photoName
* photoDescription
* photoDateTime
* photoURL
* photoCloudinaryId

### Pothole Verification
* potholeVerificationProfileId (foreign key)
* potholeVerificationPotholeId (foreign key)
* potholeVerificationDateTime

## Multiplicity
- One to many profiles can have many potholes
- One to many profiles can verify pothole posts
- One to many pothole posts can have many photos
- One to many pothole posts can have many pothole verifications