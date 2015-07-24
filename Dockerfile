FROM node:0.12.7
COPY package.json game.js /app/
COPY game /app/game/
COPY supporting-libs /app/supporting-libs/
RUN cd /app && npm i && rm /bin/sh && ln -s /bin/bash /bin/sh
EXPOSE  3000
CMD ["node", "/app/game.js"]
