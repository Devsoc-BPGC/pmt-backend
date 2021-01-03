set -xe

if [ $TRAVIS_BRANCH == 'staging' ] ; then

	openssl aes-256-cbc -K $encrypted_0ddd2445e49f_key -iv $encrypted_0ddd2445e49f_iv -in travis_rsa.enc -out travis_rsa -d
	chmod 600 travis_rsa
	mv travis_rsa ~/.ssh/id_rsa  

  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_rsa

  ssh -o "StrictHostKeyChecking no" travis@devsoc.club 'exit'
  rsync -a ./ travis@devsoc.club:/home/travis/pmt-backend/
  ssh travis@devsoc.club 'cd pmt-backend && npm run restart:pm2'
  
else
  echo "Not deploying, since the branch isn't staging branch."
fi