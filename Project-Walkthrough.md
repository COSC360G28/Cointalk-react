# **Welcome to Cointalk!**

**Made by Owen Murovec, Luke Sparg, Mark Behnke, and Talon Pratt**

![](CTHomePage.png)

_Home Page for Cointalk_

_The Create Post Menu_

Cointalk is our platform to share information, advice, and just chat about different cryptocurrencies! Users are able to create posts for any of the supported coins for everyone on the website to see. The posts are split into different categories for each supported coin, shown across the banner along the top. This allows there to be posts for each particular coin without cluttering up the page for people who aren&#39;t interested in topics about a certain coin. Above the banner is the log in and signup buttons, which will change to showing the user&#39;s name and a link to their profile page if they are logged in. Posts are split into 2 types; text and image. Text posts are posts that only contain text in them while image posts also contain an image that will be displayed a ![](CT_Images\CTCreatePost.png) longside any text the user decides to put in with the image. Next to each post is the name of the user that made the post, as well as their profile image, clicking on the username will bring you to their profile page. The images for both the posts and the user avatars are stored in a filesystem for the server and the filepath is saved in the database, making it simple to retrieve the images whenever they are needed. Javascript was used for form validation for post creation and user signup. Of course, each of these posts also feature a fully-fledged comment section. Users are able to comment on a post and provide their opinion or whatever they&#39;re thinking about a post. They are also able to reply to other comments in a post instead of directly commenting to the main post allowing for discussion to be had between users. Users are also able to edit their posts and comments, making it simple to fix any accidental typos that may have been made. Cointalk also has special admin users that are there to keep everything in the site running smoothly. Admin users are able to delete posts and comments made by other users, as well as completely ban a user from the platform. Banned users will be unable to login to the website anymore, rendering them unable to post any more posts or comments. Posts on the front page are able to be sorted by either newest, by the hottest posts, or can be search for using the search bar. Users are also able to star a post or comment that they like, which will give that post and/or comment a higher score, pushing that post to be higher up on the front page if it is being sorted by hot posts. All posts, comments, and stars are stored in the database and are retrieved from when the page is loaded. This ensures that everything stays consistent between page visits. Ajax was also used for faster page loads, and to allow comments to be refreshed instantly, skipping the need to refresh the page. The front end is run on react, which was chosen because it very responsive on both mobile and the desktop, as well as being a more modern architecture. Since mobile is a hugely important demographic for any website, we considered it very important to make sure that it was supported well on our website. The hosting is done with docker to give us easy access to viewing the website as we made it. First, lets look at the process for making an account to join in on the fun.

# **Account Creation**

_Signup Page_

_Login Screen_

A ![](CTLogin.png) ccount creation an important part of every website, and that&#39;s no exception here. Users are able to easily signup by navigating to the signup page via the link in the top-right of the screen from the main page and inputting in their username, email, and password. The password is hashed when it is input into the database to ensure the safety of all users. Clicking on the camera image will also allow the user to put up an image for their profile, though it isn&#39;t required. The sign in link in the top right will direct the user to the signup page in case they al ![](RackMultipart20210416-4-2wjxj8_html_fc8f5843a444b734.png) ready had an account, and clicking on the Cointalk logo will bring the user back to the main page of the website. The login screen also features a minimalistic design like the signup page. New users that have signed up are added into the database, which will be gone over late in this document.

# **Profile Page**

![](CTProfilePage.png)

_Profile Page Example_

Each user has a profile page, displaying a list of all their comments and posts as well as the score for each of them. It also has the date they joined the website and a picture of their avatar! All users can view anyone&#39;s profile page just by clicking on their name somewhere on the website, so if you&#39;re ever looking for a quick summary of a user&#39;s posts on the website it&#39;s very simple to find and look through.

![](RackMultipart20210416-4-2wjxj8_html_9d67155539318d1e.png)
# **The Database**

_Representation of Our Database_

#

Note: This diagram is just a representation and does not contain everything that is used in our database. The DDL file should be checked for a more thorough look into how it operates.

This is our database. It stores all of our user data, post data, comment data, and what posts or comments our users have starred. The database is run on PostgreSQL and contains many foreign keys to ensure that the data is always the same between the tables so there are no discrepancies. The arrows in the diagram show what table the foreign keys are referencing. All data for the website is taken from the database, so it&#39;s extremely important that it&#39;s kept well maintained no information is withheld from it. Almost every page in the website involves a query to the database, whether that be a query for all posts of a certain coin type, of users to check for a login, of comments for a post, or of stars to see a total point count.

That&#39;s everything in our website! We had a lot of fun making it and think it turned out great. We hope you enjoyed the website as well!
