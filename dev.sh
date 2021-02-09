#!/usr/bin/env bash
set -euo pipefail

if [ ! "$(docker ps -q -f name=MyDiscussionForum-DB)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=MyDiscussionForum-DB)" ]; then
        # cleanup
        docker rm MyDiscussionForum-DB
    fi
    # run your container
    docker run --name MyDiscussionForum-DB -p 5432:4000 -e POSTGRES_PASSWORD=MyDiscussionPass -d postgres
fi
cd functions && npm run serve &
cd react-app && npm run start 
