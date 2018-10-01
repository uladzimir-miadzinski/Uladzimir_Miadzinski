import * as shell from 'shelljs';

shell.cp('-R', 'backend/server.crt', 'dist/server.crt');
shell.cp('-R', 'backend/server.key', 'dist/server.key');
shell.cp('-R', 'backend/users.json', 'dist/users.json');
