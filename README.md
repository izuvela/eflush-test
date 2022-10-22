## eFlush

## Git flow instructions: 
### main vs/and develop
Instead of a single main branch, we use two branches (potentially three if we decide to later add the staging branch) to record the history of the project. The main branch stores the official release history, and the develop branch serves as an integration branch for features.
develop is a default protected branch. Protected means that nobody can push code directly to it. Actual work always happens on feature (and bugfix) branches.

## Feature branches
Each new feature should reside in its branch. But, instead of branching off of main, feature branches use develop as their parent branch. When a feature is complete, it gets merged back into develop (merge requests + code reviews). Features should never interact directly with main.

## Bugfix branches
These branches adhere to the same rules and principles as feature branches but are used to fix bugs, not implement new features.

## Naming conventions
Collectively, feature and bugfix branches are known as temporary branches. As the name implies, these are disposable branches that can be created and deleted by need of the developer or deployer. Most conventions recommend leading the branch name with prefixes like hotfix-, feature-, or some other variant of the categorization of tasks.

1. Branch name start with a type keyword (feature or bugfix)
2. Next comes the "/" sign
3. Third thing is GitLab issue number
    a. Note: this means that for every branch an issue needs to be created. Normally, issues get created before     branches because they define what needs to be done and how.
4. Next come the "_" sign
5. Last thing is the name of the issue with "-" instead of the spaces

For example, if we have an issue on GitLab named "Implement login form" and it's an issue #10, the branch name should be "feature/10_implement-login-form".