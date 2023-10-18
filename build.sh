#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
cd /data/www/dev
#rm -rf ./node_modules
/usr1/tpp/appl/language/node/node-v16.17.0-linux-x64/bin/yarn install
/usr1/tpp/appl/language/node/node-v16.17.0-linux-x64/bin/yarn build
echo 'end:' $(date '+%Y-%m-%d %r') >> /data/git/iitp.git/hooks/post-update.log