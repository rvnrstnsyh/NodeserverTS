# |-------------------------------------------------------------------------------
# | NodeserverTS Copyright © 2021 rvnrstnsyh All Rights Reserved
# |-------------------------------------------------------------------------------
# |
# | Author    : Rivane Rasetiansyah <re@rvnrstnsyh.dev> (https://rvnrstnsyh.dev)
# | GitHub    : https://github.com/rvnrstnsyh
# | GitLab    : https://gitlab.com/rvnrstnsyh
# |

#!/bin/sh

install(){
  { # Catch
  npm install \
              compression@latest \
              cors@latest \
              dotenv@latest \
              envalid@latest \
              express@latest \
              helmet@latest \
              module-alias@latest \
              joi@latest \
              mongoose@latest \
              morgan@latest && \

  npm install \
              @types/compression --save-dev \
              @types/cors --save-dev \
              @types/express --save-dev \
              @types/morgan --save-dev \
              @types/node --save-dev \
              @typescript-eslint/eslint-plugin --save-dev \
              @typescript-eslint/parser --save-dev \
              eslint --save-dev@latest \
              eslint-config-prettier@latest --save-dev \
              eslint-plugin-prettier@latest --save-dev \
              prettier@latest --save-dev \
              tsc-watch@latest --save-dev \
              typescript@latest --save-dev && \

  cp .env.example .env && yarn dev
 }
}

# Call
install
