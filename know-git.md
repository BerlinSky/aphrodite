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

#### You can view the history on GitHub: on History Tab

Now, other teammates else checked in some changes and pushed to the remote repository.  You want to pull down the updates.

```` 
$> git pull
````

Manage remotes
````
$> git remote add <name> <address>
$> git remote rm <name> 
$> git push -u <name> <branch>
````

#### How to start collaborating?

````
$> git clone <remote repo> <local-folder>
$> git remote -v
$> git push -u <name> <branch>
````

#### How to branch out?

````
$> git branch <my-branch>
$> git branch
$> git checkout <my-branch>
$> git branch -d <my-branch>
$> git checkout -b <my-new-branch>
````

#### How to merge?

````
$> git checkout master
$> git merge <my-branch>
$> git log
$> git status
````

#### How to do bug fixing on master?

````
$> git checkout master
$> git branch
$> git pull
$> git status
$> git commit -m "Fixed the bug"
$> git status
$> git push
````


## New Session: 