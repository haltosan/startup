# startup
260 app

Include notes on startup ideas here

In a merge conflict, the first version of the file is the local copy, while the second version is the remote. The flow for resolving is pull, remove the header stuff, commit, push.


When planning gifts, it can be really tricky to get something the person wants without letting them know. It can also be hard to ensure they don’t get any duplicate gifts. Wishlist Wizard helps manage all of this easily. Users can view the wish list of a friend or search the list and notify other users once they pick out a gift in just a few taps. The recipient will never get another duplicate gift again, all the while not ruining the surprise.
Key features:
-	Secure login over https
-	Display a searchable wish-list
-	Notify gift givers when a gift is selected
-	Gift recipients don’t know what they’re going to get

![login wireframe](images/login.png)

![main page wireframe](images/main.png)

# Simon
Here's a link to that [repo](https://github.com/haltosan/simon) and my [website](https://simon.notawebdev.click/)

Using windows is kinda tricky. The deploy scripts are bash, so it's big sad. Also, the pem they gave us doesn't like to work on windows because of odd permission errors. I still can't get it to work unless I'm using a custom ssh client. Oh well. I can do sftp from there to deploy everything manually, but it isn't the worst. I need a better dev environ right now. All I'm using is notepad++ and command prompt for git. VSCode may be the only way at this point.

Styling can be pretty hard. I was having trouble getting anything to show up properly. Turns out I was missing the main.css file completely and the only styling it could apply was from bootstrap. Bootstrap is also really nice and gives you a lot of nice features. It does take a while to learn what is available, and I expect I'll be learning for a while.

Javascript can be tricky. I had issues with local storage. When I was hosting the server off my local file system (just opening the html files in my browser), local storage wasn't being kept between each page. In deployment, it was remembering between pages. In the end, I figured out that the file system version didn't work as a continuous website (the browser has no way of knowing), but the deployed version was all under the same domain name.

Javascript working with local storage will not work when hosted locally from files. You need to test with a real web deployment. The VSCode extension will likely do this, but I don't have that. Maybe python SimpleHTTPServer could work. 

Javascript and HTML are tightly coupled, more so than I thought. I always thought the ui layer was disconnected from the logic layer. Adding features taught me that I was very wrong. Every feature needs an entry point, and every entry point needs to be connected to the logic layer. This back and forth between both layers can be tricky if you don't properly plan it out at the start. I didn't plan it out very well at the start (surprise!) and ran into several issues that I only found in production. While it is easy to find issues in production, it is rather expensive to deploy compared to a dev deployment. It pays off to have a good dev environ.

Websockets are pretty hard to test. I needed to pull out my phone to see how different clients work at the same time. Then when both clients are connected, I had to create events on both sides to see the messages. I think I could have solved this with a private browser tab, but I didn't think of that until after I tested this. Something else that's tricky about this is these web socket events are hard to generate programatically without a full blown node app. I guess this goes back to "hard to test". Also, because the result of the event is a UI change, it becomes even harder to test this easily.

Here's an example curl to the api endpoint:

```
curl "https://startup.notawebdev.click/api/putList" -X POST
  -H "User-Agent: ------" 
  -H "Accept: */*" -H "Accept-Language: en-US,en;q=0.5" -H "Accept-Encoding: gzip, deflate, br" 
  -H "Referer: https://startup.notawebdev.click/login.html" -H "Content-type: application/json; charset=UTF-8" 
  -H "Origin: https://startup.notawebdev.click" -H "DNT: 1" -H "Connection: keep-alive" 
  -H "Cookie: token=--TOKEN_HERE--" 
  -H "Sec-Fetch-Dest: empty" -H "Sec-Fetch-Mode: cors" -H "Sec-Fetch-Site: same-origin" -H "TE: trailers"
  --data-raw "{""recipient"":""Anna"",""list"":^[^[false,""Beef""^],^[false,""Cakes""^]^]}" 
```

For the service layer, this was an adventure. Adding peer to peer connections was rather hard to test (see notes above). It was also rather hard to figure out the data representation for the messages. Dealing with multiple devices with faulty js makes it really hard to verify communications. Other tricky parts to work on were the public api testing. Integrating an external API was significantly easier than I thought. I used the drand public verifiable random values for password salts. Working with the database UI was terribly frustrating, which is why the public api was such a nice thing to have implemented.
 
Building the application was the hardest part. I wasn't using the deploy script because I'm on Windows. This meant I had no idea how the files were supposed to be bundeled. I was just running the build and putting that onto the server. This gave me a lot of issues I was having a hard time debugging. Because the files were optimized, I couldn't really track down the exact line number and that also made it hard. At the end of the day, I had to open the deploy file and copy all of the commands, just using the Windows equivalent. I couldn't find anywhere that showed how to run the app once it was built, and that was really hard for me to navigate without clear directions.
