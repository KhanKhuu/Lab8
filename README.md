# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
    1. Within a Github action that runs whenever code is pushed
   
2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
    - No, because unit testing is for testing individual units, not features. A unit test would individually test the text input, sending, and receiving of messages that the "message" feature entails separately.
    - 
3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
    - Yes, because this is an individual component of a program (as opposed to "message", which is a feature made up of a bunch of components bundled together).
    - 
4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

