Group Members:

- Mark Behnke
- Talon Pratt
- Owen Murovec
- Luke Sparg

## High level description

Cointalk is a website that allows crypto enthusiast users to discuss all things crypto related! This web application currently supports four popular cryptocurrencies. With the ability to sign up and customize your profile, to liking posts that other's create, this website covers all bases of a modern forum. Users can limit their posts to their liking, create posts with images and/or text, and posting to it their desired coin category.

## Main

- [DONE] Layout document (Planned layout of your page showing elements, sizes, placement –this is the plan for what your site will look like)
  - [Figma Document](https://www.figma.com/file/N4NSNdxIbqqxp3pWudKR5f/CoinTalk?node-id=0%3A1)
- [TODO] Organization of pages (How are pages linked? –site map)
- [DONE] Layout with contextual menus (i.e., when user has logged on to site, menus reflect change)
  - Top right corner of the Navigation bar shows a login/signup prompt when the user is not logged in. When the user is logged in, it will either show their profile image or a default image if they have not uploaded one. When clicked, the image takes the user to their account page.
- [DONE] 2 or 3-column layoutusing appropriate design principles (i.e., highlighting nav links when hovered over, etc.)
  - A single column layout worked best for our style of application and instead of using a two column layout, we added a couple additional headers on the main page. One header allows the users to select a category and the other allows the user to sort or search the posts.
- [DONE] Navigation links along the top
  - Our logo when clicked, takes the user to the main page and also includes prompts for the user to sign in or a button to take them to their account.
- [DONE] Has a masthead and a footer
  - All pages have a Navigation bar and the main page has a footer where users can choose the page.
- [DONE] Navigation links need to be available regardless of where a user is viewing the page
- [DONE] Navigation breadcrumb strategy (i.e., user can determine where they are in threads)
  - Our interface is intuitive for users to know where they are and they are able to click the back button to go to the previous page when applicable.
- [DONE] Page for user registration
  - `/signup`
- [DONE] Form entry of user information along with user image
  - Our signup page allows the user to upload an image and other info.
- [DONE] Form validation with JavaScript before submission
  - Both our signup and create-post pages have proper form validation to ensure the information the user is providing is valid before sending it to the server.
- [DONE] Responsive design philosophy (minimum requirements for different non-mobile display sizes)
  - Our website does not only look great on all Desktop screen sizes, but also Mobile! 😎
- [DONE] AJAX (or similar) utilization for asynchronous updates
  - Many parts of our site utilize axios for AJAX operations. Comment loading, Post loading, user loading, and a bunch of other things use AJAX for quick initial load times and updates without page reloads.
- [DONE] Preliminary summary document for server-side, indicating implemented functionality
  - See [Document](preliminay_server_document.pdf)
- [DONE] Post storage/Discussion thread storage in database
  - We used a PostgreSQL server (Docker Container) and query to store all our data.
- [DONE] User account information stored in the database (including user image)
  - Same as Post data. For images, we store the images in a folder on the Node server and save filenames to the database. To retrieve the photos we have the `/image/:id` endpoint.
- [DONE] Appropriate security for data
  - The database is properly secured and data is only accessible through our API.
- [DONE] Site must maintain state (user state being logged on, etc.)
  - We store JWT in the Cookies of the user's browser and identify them by decoding them into sessions on the server.
- [DONE] Error handling
  - We use Proper HTTP codes and error handling to respond to all requests.
- [DONE] Browse discussions/posts without registering
  - Users can browse discussions and posts without signing in.
- [DONE] Search for discussions/posts by keyword without registering
  - Users can user the searchbar to search through posts and users.
- [DONE] Register at the site by providing their name, e-mail and image
  - Using the Signup page, users can register an account.
- [DONE] Allow user login by providing user id and password
  - Using the Login page, users can login.
- [DONE] Create and comment when logged into the site
  - Users can comment and reply to comments on posts.
- [DONE] Users are required to be able to view/edit their profile
  - Users can edit their username on the user page.
- [DONE] User password recovery (via email)
  - Users can provide their email address to receive an email with their password.
- [DONE] Search for user by name, email or post
  - User's can be searched for in the searchbar on the main page. Their posts will show up and users can click on their account names to go to the user's page.
- [TODO] Enable/disable users
- [DONE] Edit/remove posts and comments
  - Users can delete their own posts and comments.

## 5 of the following

- [TODO] Collapsible posts/threads without page reloading
- [DONE] Hot threads/hot poststracking-show items by ranking
  - Users can select to sort posts by most liked.
- [TODO] Alerts on page changes
- [TODO] Accessibility
- [DONE] Tracking comment history from a user’s perspective
  - User's comments can be seen on their profile page.
- [DONE] Activity by date
  - Users can select to sort posts by date.
- [DONE] Resolve user problems (such as forgotten passwords)
  - Users can provide their email address to receive an email with their password.
- [TODO] Admin view reports on usage (with filtering)
- [DONE] Your choice (this is your opportunity to add additional flourishesto your site but will need to be documented in the final report)
  - [DONE] We added categories to allow for users to sort posts by category.
  - [DONE] We added pagnation to the main page to limit the ammount of posts on one page.

## Other

- [DONE] Summary of features implemented
  - See this Document
- [DONE] Walkthrough document(minimal/additional: 6/4)
  - See [Walkthrough](walkthrough.pdf)
- [TODO] Detailed description of your implementation(minimal/additional: 6/4)
- [TODO] Deployment, client-and server-side unit testing
