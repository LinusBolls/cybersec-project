# unnamed codepen clone

live instance: https://codepen.bolls.dev

## description

this is a [CodePen](https:/codepen.io) clone. users can create iframe-based "embedded websites" using html, css, and javascript. these can either be public or private.

## getting started - development

```bash
# start the container with the database
docker-compose up -d
# start the nextJs webserver, which will run on http://localhost:3000 by default
npm run dev
```

## technologies
- Typescript
- NextJs (app router)
- Tailwind CSS
- TypeORM
- SQL
- Docker

## possible threats and security measures
### password security
#### current
- user passwords are hashed and salted using [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- user passwords must be at least 20 characters long
#### future
- check if passwords have been breached on signup and password change
- extract authentication into a dedicated microservice to reduce the attack surface
- add 2-factor-authentication via email

### session security
#### current
- we do authentication via refreshtoken / accesstoken, both are stored as `HttpOnly` `Secure` cookies
- the accesstoken expires after 15 mins, the refreshtoken after 7 days
- the accesstoken is required for authorizing requests, and since it needs to be refreshed every 15 mins, this is the longest duration that a user could hold on to revoked permissions
- we have seperate secrets for signing the refreshtoken and accesstoken, both of which are created by a password generator
- on every request, if the user has a valid refreshtoken but invalid or missing accesstoken, we issue them an accesstoken. as of yet, no user permissions are encoded into the access token and no database query is made to check the validity of the user.
#### future
- add a "Remember me" checkbox to register and login screens, which would shorten the session duration and thereby make it safer for users to access their account from public devices
- add overview screen with all running sessions and the ability to abort them
- send info emails for security relevant actions like signins and and password changes
- i implemented authentication myself for learning purposes, for a production-ready service i would use a library or oauth provider

### cross-site scripting (XSS)
#### current
- the site uses ReactJs, which escapes user input by default
- the iframes are fully sandboxed
- we have a strict CORS policy and CSP. even if the site had XSS vulnerabilities, an attacker wouldn't be able to communicate with a malicious server
#### future
- if the site had XSS vulnerabilities, it would be vulnerable to cross-site request forgery (CSRF) attacks. this could be mitigated by implementing CSRF tokens.
- we could add [cryptographic nonces](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce) to our own script tags, allowing us to further tighten our CSP

### supply chain attacks
#### current
- we use [Dependabot](https://github.com/dependabot) in our repository, which makes automatic pull requests for outdated dependencies
- we audit dependencies before adding them to the project to ensure they are properly maintained

### SQL injection
#### current
- we use TypeORM, which automatically escapes user input in queries. this prevents SQL injections.

### infrastructure
#### current
- since we use a managed hosting service for containerized applications, the security of the host server is out of our hands.
#### future
- ssh access only via key
- dockerize the app and database together, so we don't have to expose the database

### MITM
#### current
- malicious could execute MITM attacks by various mechanisms (SSL downgrade attack, physical device access, browser extensions, malware on the user's device)

### enumeration
#### current
- NextJs does not serve dangerous headers like `X-Version` or `Powered-By`
- Portscan
- Timing attacks are possible on most endpoints
- errors thrown in production don't get propagated to the user
- an attacker could analyze the javascript bundle and gain information about e.g. pages they're not meant to access, dependencies we're using, or potential XSS vulnerabilities.

### denial of service (DOS / DDOS)
#### current
#### future
- using a cdn like cloudflare would shield our servers
- we could set up a docker swarm to automatically scale according to unexpected demand
- add `robots.txt` and `sitemap.xml` files to control search engine indexing and make us less vulnerable to google dorks

### web scraping
#### current
- usernames can be scraped
- we use UUID's instead of sequential ids for all entities to prevent attackers from guessing urls or estimating the amount of entities
#### future
- implement CAPTCHA's

### human error in the development team
#### current
- developers could push bad code by accident, leak secrets, or mess with the production database
#### future
- set up schema validation for endpoints so an endpoint can't accidentally sensitive information like user emails
- mandatory code reviews and master branch protection would force all code to be peer-reviewed
- setting up a vault with access rights for site-specific passwords and secrets would restrict unauthorized people from gaining access to them
- research how to pretect the production database from unauthorized actions
    

## roadmap

[ ] dings