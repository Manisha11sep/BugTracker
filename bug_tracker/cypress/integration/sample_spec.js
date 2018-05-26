const API = require("./../../../bug_tracker/db.json");

describe("Login page of Bug_tracker", function() {
  it("Visit the Login page and Check title of page", function() {
    cy.visit("http://localhost:3000/");
    cy.title().should("include", "React App");
  });

  it("Test elements of Login page", function() {
    cy
      .get("input[type=text]")
      .should("have.attr", "placeholder", "Enter your Username");
    cy
      .get("input[type=password]")
      .should("have.attr", "placeholder", "Enter your Password");
    cy.get(":nth-child(4) > .sc-EHOje").should("contain", "Login");
  });

  // {enter} causes the form to submit
  it("Enter username and password and redirect to Home page", function() {
    cy.get("input[type=text]").type("manisha");
    cy.get("input[type=password]").type(`${"abc"}{enter}`);

    // we should be redirected to /Home
    cy.url().should("include", "http://localhost:3000/home");
  });
  // UI should reflect this user being logged in
  //  it('cy.getCookie() - get a browser cookie', function () {
  // https://on.cypress.io/getcookie
  // cy.getCookie('/api/session').should('have.property', 'username', 'manisha')
  //   })
});

describe("home page Testing", function() {
  it("test the Welcome {Username} message", function() {
    cy.get("h1").should("contain", "manisha");
  });

  it("Test navbar in the header", function() {
    cy.get(".active > .sc-kGXeez > a").should("contain", "Home");
    cy.get(":nth-child(2) > .sc-kGXeez > a").should("contain", "Dashboard");
    cy.get(":nth-child(3) > .sc-kGXeez > a").should("contain", "New Issue");
    cy.get(":nth-child(4) > .sc-kGXeez > a").should("contain", "Search");
    cy.get(":nth-child(5) > .sc-kGXeez > a").should("contain", "Log out");
  });

  it("Test the elements of Home page", function() {
    cy.get(".home-heading > h1 > a").should("contain", "Issues");
    cy.get(".home-heading > h1 > a").should("contain", "New Issue");
    cy.get(".home-heading > h1 > a").should("contain", "Search");
  });
});

describe("Issue dashboard Testing", function() {
  it("Click on Issue and it should redirect to the Dashboard", function() {
    //Select Isses from the home page
    cy
      .get(".home-heading > h1 > a")
      .contains("Issues")
      .click();
    // we should be redirected to /Home
    cy.url().should("include", "http://localhost:3001/dashboard");
  });

  it("Load button should load all the comments on the Issue", function() {
    cy
      .get(
        ":nth-child(2) > .comment > .comment-container > .load-comment > button"
      )
      .click();
  });
});

describe("Edit issue button testing ", function() {
  it("click on edit button and it should enalbe a text box", function() {
    // cy.get(':nth-child(2) > .comment > .comment-container > .load-comment > button').click()
    cy.get(".Message__edit > svg").click();
    cy
      .get(":nth-child(3) > :nth-child(1) > .Message__container > .bug-text")
      .type(`${" Whats up"}{enter}`);
  });

  it("User should able to post a comment", function() {
    cy
      .get(
        ":nth-child(2) > .comment > .comment-container > :nth-child(1) > .comment-textbox"
      )
      .type("Cypress makes testing easy");
    cy
      .get(
        ":nth-child(2) > .comment > .comment-container > :nth-child(2) > button"
      )
      .click();
  });

  it("Create new Issue", function() {
    cy
      .get(":nth-child(3) > .sc-kGXeez > a")
      .should("contain", "New Issue")
      .click();
    cy.url().should("include", "http://localhost:3001/issue");
    cy.wait(1000);
  });
});

describe("Test New Issue component", function() {
  it("Create post should able to create a new post", function() {
    cy.server();
    cy.route("POST", "API", {
      title: "HTTP 404",
      description:
        "The HTTP 404, 404 Not Found and 404 error message is a Hypertext Transfer Protocol standard response code, in computer network communications"
    });
    cy.get("input").type("HTTP 404");
    cy
      .get("textarea")
      .type(
        "The HTTP 404, 404 Not Found and 404 error message is a Hypertext Transfer Protocol standard response code, in computer network communications"
      );
    cy
      .get(".btn")
      .should("contain", "Submit a Issue")
      .click();
    cy.wait(1000);
  });

  it("Search Issue", function() {
    cy
      .get(":nth-child(4) > .sc-kGXeez > a")
      .should("contain", "Search")
      .click();
    cy.url().should("include", "http://localhost:3001/search");
    cy.wait(1000);
  });
});

describe("Test Search Component", function() {
  it("Try searching withing entering anything", function() {
    cy.get(".btn").should("contain", "Search").click;
    window: alert();
  });
  it("Enter the search text in text box and click SEARCH button", function() {
    cy.get(".sc-jzJRlG").type("system");
    cy
      .get(".btn")
      .should("contain", "Search")
      .click();
    cy.wait(1000);
  });
  it("Check the resonse", function() {
    cy.get(":nth-child(1) > b").should("contain", "Title");
  });
});

describe("logout component", function() {
  it("User should logout as clicks on logout button", function() {
    cy
      .get(":nth-child(5) > .sc-kGXeez > a")
      .should("contain", "Log out")
      .click();
  });
});
