This project is to build a forum to talk about trading cryptocurrencies.

# \[TODO] Backend HTTP Functions

## \[TODO] Query Posts

Get list of posts with sort options (Sort by new, hot, top of all time) include pagnation

### \[TODO] Posts by category

### \[TODO] Posts by keyword

### \[TODO] Posts by user

## \[TODO] Get Comments

### Reply IDs

### ID

### Commenter UID

### upvote count

## \[TODO] Get Post

### ID

### poster UID

### title

### Category

### text

### comment IDs

### upvote count

## \[TODO] Search Users

Search by username

## \[TODO] Login

Hash the password and see if the matching exists in the database

### email || usename

### password

## \[TODO] Create Account

Create UID, Hash the password (Security) and store in DB

### email

### username

### image

## \[TODO] Create Comment

Filter text and add to database, set "upvote" count to 0, add timestamp

### post ID

### Credentials

### text

## \[TODO] Create Post

Filter text and image, add timestamp, set "upvote" count to 0, add to DB

### Credentials

### Category

### Title

### text?

### Image?

## \[TODO] Upvote Comment

### Comment ID

### credentials

## \[TODO] Request Password reset

### email

## \[TODO] ADMIN Ban User

Validate admin, add BAN flag to account

### UID

### Credentials

## \[TODO] ADMIN Remove Post

Validate admin, delete post

### Post ID

### Credentials

## \[TODO] Edit Post

Validate admin or post creator, filter image/text change post data

### Post ID

### title?

### text?

### image?

# \[TODO] React Front End

## Screens

#### \[TODO] Navigation Bar

##### \[TODO] Login / Signup / logout Component

##### \[TODO] Logo

### \[TODO] Main

#### \[TODO] Sub-header with category

#### \[TODO] Main Content (FEED)

##### \[TODO] Header

###### \[TODO] Searchbar

###### \[TODO] Sort Dropdown

##### \[TODO] Post (List)

#### \[TODO] Load More Posts Button

### \[TODO] Post Page

#### \[TODO] "upvote" Counter

#### \[TODO] Title

#### \[TODO] Text

#### \[TODO] Image

#### \[TODO] Comment Button

#### \[TODO] Comment list

### \[TODO] User Page

#### \[TODO] Image

#### \[TODO] username

#### \[TODO] content container

##### \[TODO] User's Activity (Posts and comments)

## \[TODO] Reusable Components

### \[TODO] Comment (list)

#### \[TODO] upvote counter

#### \[TODO] username

#### \[TODO] reply button

#### \[TODO] text

#### \[TODO] reply list

### \[TODO] Post Thumbnail

#### \[TODO] "upvote" Counter

#### \[TODO] title

#### \[TODO] image?

#### \[TODO] Poster username

### \[TODO] Upvote counter
