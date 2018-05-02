import {browser, by, element} from "protractor";

describe("App", () => {

  beforeEach(() => {
    browser.get("/");
  });

  it("should have a title", (done) => {
    let subject = browser.getTitle();
    let result  = "My Title";

    subject.then((value) => {
      expect(value).toEqual(result);
      done();
    });
  });

  it("should have app div", (done) => {
    let subject = element(by.id("app")).isPresent();
    let result  = true;
    subject.then((value) => {
      expect(value).toEqual(result);
      done();
    });
  });

  it("should say hi", () => {

    let sayHiButton:any = element(by.id("sayHiButton"));
    let sayHiResponseLabel:any  = element(by.id("sayHiResponseLabel"));

    sayHiButton.click();

    expect(sayHiResponseLabel.getText()).toEqual("hello hi");
  });
});
