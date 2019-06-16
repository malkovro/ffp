#! /bin/bash
docker run -it --rm --name ffp -p 8000:8000 -v "$PWD":/usr/src/ffp -w /usr/src/ffp php:7.3-cli ./artisan serve --host=0.0.0.0