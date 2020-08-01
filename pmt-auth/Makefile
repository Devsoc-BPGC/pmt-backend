APP_NAME=Mello

# Git commands

# Merge upstream with fork
even:
	git fetch upstream
	git merge upstream/master
	git push origin master

# Push code to local fork.
push:
	git add --all
	git commit
	git push origin master

# Amend files to latest commit
amend:
	git commit --amend --no-edit
	git push origin --force


# Docker commands

# Run app
run:
	docker-compose up

# Build image and then run app
run-build:
	docker-compose up --build


# Database commands

# Connect to database using psql inside docker
db-connect:
	docker exec -it db psql -U postgres -d mello