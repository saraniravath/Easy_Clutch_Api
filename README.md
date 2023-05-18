# Easy Clutch API

## Description

This is the API for the Easy Clutch project which is used by instructors and students to schedule and book driving lessons.

## Collaboration


The “main” branches of the project repositories are now marked as protected, which means a direct push cannot be made to these branches. So to make updates to the main branches, a new branch with the name of the feature you are working on needs to be created and a pull request to the main branch should be submitted, and then merged.

### Steps

1. Keep updated with the remote main

Always have the latest updates in the remote main on the local branch you are working on. Keeping updated with the changes on remote main highly decreases the chances of running into a “conflict” when you try to merge your branch later. 

Command: `git pull origin <branch name>`

If you’re pulling the main branch, which is the most frequent case the command would be

> git pull origin main

2. Creating a new branch:

A new branch should be created before the changes are made, at least before a commit or add is made. You can continue working on the same branch ( never on main ) if you feel like the change that you’re about to do pertains to your current branch. You need not change to a new branch if you’re about to make a change on fee structure and you’re already on the fee-structure branch.

Command: `git checkout -b <branch-name>`

eg. if you’re working on a branch that is updating how the fee structure works, the branch can be named as “fee-structure” and the command would be 

> git checkout -b fee-structure

3. Adding the files to stage

Only the files with the required changes should be added to stage. All changed files can be accessed and added to stage using VScode or you can use command line to add the files.

Command: `git add <file1> <file2> `

eg. if the files that needed to be added to stage are index.js and feeStructure.js inside a folder named handlers, the command would be

> git add index.js handlers/feeStructure.js

Remember to always test, and review the changes before making this step and make sure the changes are necessary and working.

4. Committing the changes

If the staged changes seem fine, you can proceed with committing those changes. This step is done when a particular change is complete and working. It’s preferred that you use the command line to commit the changes. A commit message which describes what changes are being committed is also necessary for a successful commit.

Command: `git commit -m <commit-message>`

eg. if the changes that are being committed pertains to updating the fee structure to include 2 wheelers, the commit message could be “2 wheelers added to fee structure”. This means that the command would be

> git commit -m “2 wheelers added to fee structure”

5. Pushing the changes to remote from your local machine

Now you need to push these commits ( one or multiple ) to the remote (github.com) from your local machine. This is usually done when a feature is complete and ready to be merged to the main branch ( or any other branch ).

Command: `git push origin <your-branch-name>`

eg. if your current branch name is fee-structure, the command would be

> git push origin fee-structure

6. Merging these changes to remote main (the working branch)

This should be done through github to make your changes reflect in the main branch. You need to open a pull request from your current branch to your main branch through the github website. Preferably add an approver so that a second pair of eyes can go through the changes and make sure they work.

