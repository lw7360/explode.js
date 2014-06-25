# [explode.js](http://larrywu.com/explode.js)

## Make your DOM explosive with explode.js. in 3 easy steps

### Step 1. Include explode.js and jQuery.

    <script src="./explode.js"></script>
    <script src="./jquery.js"></script>
    
#### OR

    <script src="https://rawgit.com/lw7360/explode.js/gh-pages/explode.min.js"></script>
    <script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>


### Step 2. Find something to explode.

    <div id="explode-me">Explode Me!</div>

### Step 3. Explode it.

    <script>
        explode($("#explode-me"));
    </script>
    
It's that simple.

---
## Closing Remarks.

I made explode.js because I wanted to add explosion effects to one of my projects, [Babel](http://larrywu.com/babel). 
There were various tutorials on how to do so online, but I wanted to make it as simple as just calling a function. 
Currently explode.js doesn't do much more than I needed it to do for my project, i.e. it can explode a div that contains text. 
However, I do have plans to incorporate more functionality and features in the future.