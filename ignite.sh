# |-------------------------------------------------------------------------------
# | NodeserverTS Copyright © 2022 rvnrstnsyh All Rights Reserved
# |-------------------------------------------------------------------------------
# |
# | Author    : Rivane Rasetiansyah <re@rvnrstnsyh.dev> (https://rvnrstnsyh.dev)
# | GitHub    : https://github.com/rvnrstnsyh
# | GitLab    : https://gitlab.com/rvnrstnsyh
# |

#!/bin/sh

install(){
  { # Dependencies
    npm install \
                @types/compression --save-dev \
                @types/connect-flash --save-dev \
                @types/cookie-parser --save-dev \
                @types/cors --save-dev \
                @types/crypto-js --save-dev \
                @types/csurf --save-dev \
                @types/express --save-dev \
                @types/express-session --save-dev \
                @types/express-useragent --save-dev \
                @types/jsonwebtoken --save-dev \
                @types/morgan --save-dev \
                @types/node --save-dev \
                @typescript-eslint/eslint-plugin --save-dev \
                @typescript-eslint/parser --save-dev \
                eslint@latest --save-dev \
                eslint-config-prettier@latest --save-dev \
                eslint-plugin-prettier@latest --save-dev \
                nodemon@latest --save-dev \
                prettier@latest --save-dev \
                tsc-watch@latest --save-dev \
                typescript@latest --save-dev && \

    npm install \
                argon2@latest \
                compression@latest \
                connect-flash@latest \
                cookie-parser@latest \
                cors@latest \
                crypto-js@latest \
                csrf@latest \
                csurf@latest \
                dotenv@latest \
                envalid@latest \
                express@latest \
                express-rate-limit@latest \
                express-session@latest \
                express-useragent@latest \
                helmet@latest \
                joi@latest \
                jsonwebtoken@latest \
                module-alias@latest \
                mongoose@latest \
                morgan@latest && \

    cp .env.example .env && yarn dev
 }
}

# Call
install
