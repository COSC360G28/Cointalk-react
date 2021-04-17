Group Members:

- Mark Behnke
- Talon Pratt
- Owen Murovec
- Luke Sparg

## High level description

Cointalk is a website that allows crypto enthusiast users to discuss all things crypto related! This web application currently supports four popular cryptocurrencies. With the ability to sign up and customize your profile, to liking posts that other's create, this website covers all bases of a modern forum. Users can limit their posts to their liking, create posts with images and/or text, and posting to it their desired coin category.

## Main

- [✅] Layout document (Planned layout of your page showing elements, sizes, placement –this is the plan for what your site will look like)
  - [Figma Document](https://www.figma.com/file/N4NSNdxIbqqxp3pWudKR5f/CoinTalk?node-id=0%3A1)
- [✅] Organization of pages (How are pages linked? –site map)
  - See [Summary](walkthrough.pdf)
- [✅] Layout with contextual menus (i.e., when user has logged on to site, menus reflect change)
  - Top right corner of the Navigation bar shows a login/signup prompt when the user is not logged in. When the user is logged in, it will either show their profile image or a default image if they have not uploaded one. When clicked, the image takes the user to their account page.
- [✅] 2 or 3-column layoutusing appropriate design principles (i.e., highlighting nav links when hovered over, etc.)
  - A single column layout worked best for our style of application and instead of using a two column layout, we added a couple additional headers on the main page. One header allows the users to select a category and the other allows the user to sort or search the posts.
- [✅] Navigation links along the top
  - Our logo when clicked, takes the user to the main page and also includes prompts for the user to sign in or a button to take them to their account.
- [✅] Has a masthead and a footer
  - All pages have a Navigation bar and the main page has a footer where users can choose the page.
- [✅] Navigation links need to be available regardless of where a user is viewing the page
- [✅] Navigation breadcrumb strategy (i.e., user can determine where they are in threads)
  - Our interface is intuitive for users to know where they are and they are able to click the back button to go to the previous page when applicable.
- [✅] Page for user registration
  - `/signup`
- [✅] Form entry of user information along with user image
  - Our signup page allows the user to upload an image and other info.
- [✅] Form validation with JavaScript before submission
  - Both our signup and create-post pages have proper form validation to ensure the information the user is providing is valid before sending it to the server.
- [✅] Responsive design philosophy (minimum requirements for different non-mobile display sizes)
  - Our website does not only look great on all Desktop screen sizes, but also Mobile! 😎
- [✅] AJAX (or similar) utilization for asynchronous updates
  - Many parts of our site utilize axios for AJAX operations. Comment loading, Post loading, user loading, and a bunch of other things use AJAX for quick initial load times and updates without page reloads.
- [✅] Preliminary summary document for server-side, indicating implemented functionality
  - See [Document](preliminary_server_document.pdf)
- [✅] Post storage/Discussion thread storage in database
  - We used a PostgreSQL server (Docker Container) and query to store all our data.
- [✅] User account information stored in the database (including user image)
  - Same as Post data. For images, we store the images in a folder on the Node server and save filenames to the database. To retrieve the photos we have the `/image/:id` endpoint.
- [✅] Appropriate security for data
  - The database is properly secured and data is only accessible through our API.
- [✅] Site must maintain state (user state being logged on, etc.)
  - We store JWT in the Cookies of the user's browser and identify them by decoding them into sessions on the server.
- [✅] Error handling
  - We use Proper HTTP codes and error handling to respond to all requests.
- [✅] Browse discussions/posts without registering
  - Users can browse discussions and posts without signing in.
- [✅] Search for discussions/posts by keyword without registering
  - Users can user the searchbar to search through posts and users.
- [✅] Register at the site by providing their name, e-mail and image
  - Using the Signup page, users can register an account.
- [✅] Allow user login by providing user id and password
  - Using the Login page, users can login.
- [✅] Create and comment when logged into the site
  - Users can comment and reply to comments on posts.
- [✅] Users are required to be able to view/edit their profile
  - Users can edit their username on the user page.
- [✅] User password recovery (via email)
  - Users can provide their email address to receive an email with their password.
- [✅] Search for user by name, email or post
  - User's can be searched for in the searchbar on the main page. Their posts will show up and users can click on their account names to go to the user's page.
- [✅] Enable/disable users
  - Admins can Enable/Disable users on the user's profile page.
- [✅] Edit/remove posts and comments
  - Users can delete their own posts and comments.

## Additional

- [✅] Hot threads/hot poststracking-show items by ranking
  - Users can select to sort posts by most liked.
- [✅] Accessibility
- [✅] Tracking comment history from a user’s perspective
  - User's comments can be seen on their profile page.
- [✅] Activity by date
  - Users can select to sort posts by date.
- [✅] Resolve user problems (such as forgotten passwords)
  - Users can provide their email address to receive an email with their password.
- [✅] Your choice (this is your opportunity to add additional flourishesto your site but will need to be documented in the final report)
  - [✅] We added categories to allow for users to sort posts by category.
  - [✅] We added pagnation to the main page to limit the ammount of posts on one page.

## Other

- [✅] Summary of features implemented
  - See current Document
- [✅] Walkthrough document(minimal/additional: 6/4)
  - See [Walkthrough](walkthrough.pdf)
- [✅] Detailed description of your implementation(minimal/additional: 6/4)
  - See [Implementation Description](Implementation.md)
- [✅] Deployment, client-and server-side unit testing
  - The project can be locally deployed and tested by following the steps in the [readme](README.md)
