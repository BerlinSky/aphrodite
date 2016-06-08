# Get to Know GIT

Git is a Distributed Version Control System (DVCS)
It is invented by the creator of Linux.

Official Git Site: http://git-scom.com/

```` 
$> git help

$> git config --global user.email myemail.com
$> git config --global color.ui true
````

Start a project
````
$> mkdir myproject
$> cd myproject
$> git
````

Check the status
````
$> git status
````

Add file to staging area
````
$> git add README.md
$> git status
````

Commit changes
````
$> git commit -m "Set up the inital project" *.*
$> git status
````

Peek at Git Timeline History
````
$> git log
````

Show unstaged differences since last commit
````
$> git diff
$> git status
````

Show staged differences
````
$> git diff --staged
$> git status
````

Unstage files
````
$> git status
$> git reset HEAD README.md
$> git status
````

Discard Changes
````
$> git status
$> git checkout -- README.md
$> git status
````

Undo a commit
````
$> git status
$> git reset --soft HEAD~
$> git status
````

Add to a commit
````
$> git status
$> git commit --amend -m "Update the samthing"
$> git status
````

## New Session: P42