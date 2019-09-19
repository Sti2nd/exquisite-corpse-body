A web-app that let you take photos of your friends and swap out body parts with them.

Hosted at: https://sti2nd.github.io/exquisite-corpse-body/

Built with create-react-app.
Relies on the external libraries
* http://fabricjs.com/
* https://fengyuanchen.github.io/cropperjs/
* https://github.com/localForage/localForage


Not to self, steps to deploy:
1. Create local branch "gh-pages" from master
1. Remove /build from .gitignore
1. Commit build folder
2. `git subtree push --prefix build origin gh-pages`