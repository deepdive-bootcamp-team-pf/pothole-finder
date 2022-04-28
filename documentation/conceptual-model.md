## Entities
### Profile
* profileID (primary key)
* autenticationToken
* profileEmail
* firstName
* lastName
* username
* password

### Pothole Post
* potholePostID (primary key)
* postUserID (foreign key)
* latitude
* longitude
* severity
* postDateTime
* photo
* description

### Photo
* photoID (primary key)
* name
* description
* uploadDateTime

### Pothole Verification
* potholeVerificationID (primary key)
* potholeVerificationProfileID (foreign key)
* potholeVerificationPotholeID (foreign key)
* potholeVerificationTimestamp

### Report Ticket
* reportTicketID (primary key)
* reportTicketProfileID (foreign key)
* subject
* description
* reportDateTime

## Multiplicity
- One to many profiles can have many posts
- One to many profiles can submit many report tickets
- One to many profiles can verify pothole posts
- One to many pothole posts can have many photos
- One to many pothole posts can have many pothole verifications