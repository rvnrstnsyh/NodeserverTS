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
                @types/compression@latest --save-dev \
                @types/confidence@latest --save-dev \
                @types/connect-flash@latest --save-dev \
                @types/cookie-parser@latest --save-dev \
                @types/cors@latest --save-dev \
                @types/crypto-js@latest --save-dev \
                @types/csurf@latest --save-dev \
                @types/express@latest --save-dev \
                @types/express-session@latest --save-dev \
                @types/express-useragent@latest --save-dev \
                @types/handlebars@latest --save-dev \
                @types/jsonwebtoken@latest --save-dev \
                @types/morgan@latest --save-dev \
                @types/node@latest --save-dev \
                @types/nodemailer@latest --save-dev \
                @types/passport@latest --save-dev \
                @types/passport-http@latest --save-dev \
                @types/uuid@latest --save-dev \
                @typescript-eslint/eslint-plugin@latest --save-dev \
                @typescript-eslint/parser@latest --save-dev \
                eslint@latest --save-dev \
                eslint-config-airbnb-base@latest --save-dev \
                eslint-config-standard@latest --save-dev \
                eslint-plugin-import@latest --save-dev \
                eslint-plugin-n@latest --save-dev \
                eslint-plugin-prettier@latest --save-dev \
                eslint-plugin-promise@latest --save-dev \
                nodemon@latest --save-dev \
                nyc@latest --save-dev \
                pre-commit@latest --save-dev \
                prettier@latest --save-dev \
                tsc-watch@latest --save-dev \
                typescript@latest --save-dev && \

    npm install \
                argon2@latest \
                compression@latest \
                confidence@latest \
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
                handlebars@latest \
                helmet@latest \
                joi@latest \
                jsonwebtoken@latest \
                module-alias@latest \
                mongoose@latest \
                morgan@latest \
                nodemailer@latest \
                passport@latest \
                passport-http@latest \
                uuid@latest \
                winston@latest && \

    cp .env.example .env
 }
}

# Call
install
