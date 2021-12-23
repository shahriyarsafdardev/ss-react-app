# ScholarSite Load Testing

This document is about how we can start JMeter and can run load testing on ScholarSite

## Starting JMeter
Download link for JMeter: https://jmeter.apache.org/download_jmeter.cgi
- Once you have downloaded the JMeter zip folder, go to the folder location, and then extract the zip folder
- Once the folder is extracted go open the terminal and go that folder and then go inside the bin folder here
- Run the command sh jmeter.sh to run JMeter

- GUI of JMeter will open

![image (7)](https://user-images.githubusercontent.com/95229345/146619774-3407015b-9ed4-432e-9d7e-273f96c050f7.png)

- Now go to the options of JMeter
- Then to look and feel option and select the 'system' option

![image (6)](https://user-images.githubusercontent.com/95229345/146619762-dd8c3f4a-3e5a-4d36-9632-1b2057a64092.png)

## Loading Test Plan in JMeter

- Now go to the files menu and open 'Scholar site test plan.jmx', you can find the 'Scholar site test plan.jmx' in the loadTesting folder
- Once the test plan is open You will be able to list of items on the left panel
- As you see Scholar Site Test Plan is the name of our test plan it consists

![image (10)](https://user-images.githubusercontent.com/95229345/146619587-b05ab4cc-5a8d-43b2-8e75-b43c5221bd0e.png)

> Thread Group
> > Login (HTTP Request)
> > > Assertion on response of login HTTP Request
> >
> > View Results Tree
> >
> > View Results in Table

![image (8)](https://user-images.githubusercontent.com/95229345/146619600-b912c013-0a95-4c32-b5b5-8960ad734108.png)

## How to run a test in JMeter
- Press the play icon in the toolbar

### Thread Group
In the thread group, we define the number of users that we are going to the user in the load test

![image (5)](https://user-images.githubusercontent.com/95229345/146619618-e70ca074-35fa-4ef7-9c46-59661930c9a5.png)

### Login (HTTP Request)
- In the HTTP Request, we add the name of our request
- In protocol, we added HTTPS
- In Server Name, we have to add our APP ROOT URL
- In HTTP Request, we add the type of Request and in the path, we add the endpoint we need to test
- Here, we added the parameters which we need for the endpoint

![image (3)](https://user-images.githubusercontent.com/95229345/146619639-6784146f-d7c5-4946-b1df-b28cbde0f54c.png)

### Assertion on the response of login HTTP Request
- Here we have selected a field to test which is response code and we have defined that it should be 200

![image (2)](https://user-images.githubusercontent.com/95229345/146619655-10a56e1c-ad2e-4d0f-802c-8f48207c1fcf.png)

### View Results Tree
- Here, we can see the results of our load testing We can see a complete breakdown of each request made

![image (9)](https://user-images.githubusercontent.com/95229345/146619680-a2d59a3e-59ef-40e3-961e-f2199c4b2781.png)

### View Results in Table
- Here we can see the collective result of all the requests made

![image (1)](https://user-images.githubusercontent.com/95229345/146619667-bcd28690-5a8a-4c1f-bf01-ce38f52d787e.png)
